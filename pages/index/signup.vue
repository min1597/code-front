<script setup lang='ts'>
import axios from 'axios'
import dayjs from 'dayjs';

const { $modal, $sessionInitlization, $loadingView, $toast, $user, $JSON } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const runtimeConfig = useRuntimeConfig()

const data: {
    name: { firstName: string, lastName: string },
    credentials: { username: string, password: { original: string, retry: string } },
    gender: 'male' | 'female' | 'other',
    birthDate: string,
    phoneNumber: string,
    emailAddress: string,
    terms: { [ name in string ]: boolean }
} = reactive({
    name: { firstName: '', lastName: '' },
    credentials: { username: '', password: { original: '', retry: '' } },
    gender: 'male',
    birthDate: '',
    phoneNumber: '',
    emailAddress: '',
    terms: reactive({
        tos: false,
        privacy: false,
        aup: false,
        marketing: false
    })
})

const certification: { emailAddress: string | null, phoneNumber: string | null } = reactive({
    emailAddress: null,
    phoneNumber: null
})

let _loader: { success: true, solve: () => boolean }
onBeforeMount(async () => {
})

async function requestCertification (_event: Event, _type: 'phoneNumber' | 'emailAddress') {
    try {
        _loader = $loadingView.addLoad('인증번호를 요청하는 중')
        const _requestResult: { success: true, data: any, status: number, raw?: any } | { success: false, error: string, status: number, raw?: any } = await new Promise((_resolve, _reject) => {
            axios.post(`${ runtimeConfig.public.apiEndpoint }/v0/certification`, { type: { phoneNumber: 'phone_number', emailAddress: 'email_address' }[_type], target: data[_type] }, { headers: { authorization: window.localStorage.getItem('session') } })
                .then(_result => _resolve({ success: true, data: _result.data, status: _result.status, raw: _result }))
                .catch(_error => _resolve({ success: false, error: _error.response.data.error, status: _error.response.status, raw: _error }))
        })
        if(_requestResult.success == true) {
            _loader.solve()
            $modal.add('form', '인증번호', '입력된 전화번호로 인증번호를 보냈어요.<br>제한시간 안에 인증번호를 입력해주세요.', [ { type: 'input', title: '인증번호', name: 'code', placeholder: '인증번호를 입력해주세요.' } ], true, async (_data: { code: string }) => {
                if(/[0-9]+/.test(_data.code) == false || _data.code.length !== 6) return $toast.add('danger', '잘못된 인증번호입니다.')
                    _loader = $loadingView.addLoad('인증을 처리하는 중')
                    if(dayjs(_requestResult.data.data.expires_at).diff() <= 0) return $toast.add('danger', '만료된 인증 요청입니다.')
                    const _validateResult: { success: true, data: any, status: number, raw?: any } | { success: false, error: string, status: number, raw?: any } = await new Promise((_resolve, _reject) => {
                        axios.post(`${ runtimeConfig.public.apiEndpoint }/v0/certification/${ _requestResult.data.data.id }/validate`, { code: _data.code }, { headers: { authorization: window.localStorage.getItem('session') } })
                            .then(_result => _resolve({ success: true, data: _result.data, status: _result.status, raw: _result }))
                            .catch(_error => _resolve({ success: false, error: _error.response.data.error, status: _error.response.status, raw: _error }))
                    })
                    if(_validateResult.success == true) {
                        _loader.solve()
                        certification[_type] = _requestResult.data.data.id
                        $toast.add('success', '인증에 성공하였습니다.')
                    } else {
                        throw $toast.add('danger', '인증번호 요청에 실패하였습니다.')
                    }
            }, { cancel: '취소', continue: '인증' })
        } else {
            throw $toast.add('danger', '인증번호 요청에 실패하였습니다.')
        }
    } catch(_error) {
        const _button = _event.target as HTMLButtonElement
        _button.removeAttribute('loading')
        _button.removeAttribute('disabled')
        _loader.solve()
    }
}
const isValidEmail = (_emailAddress: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(_emailAddress)
</script>
<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 회원가입
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            span.font-medium.mr-1 루나 네트워크
            | 에 로그인할 루나 통합계정을 생성해요.
    div.w-full.my-4
        div.w-full.my-2
            h3.font-light.text-sm(class='mb-0.5') 이름
            div.w-full.flex.items-center.gap-2
                div.w-14
                    Input(placeholder='성' v-model='data.name.lastName')
                div.flex-grow.min-w-0
                    Input(placeholder='이름을 입력해주세요.' v-model='data.name.firstName')
        div.w-full.my-2
            h3.font-light.text-sm(class='mb-0.5') 사용자 이름
            Input(placeholder='사용자 이름을 입력해주세요.' v-model='data.credentials.username')
        div.w-full.my-2
            h3.font-light.text-sm(class='mb-0.5') 비밀번호
            Input(placeholder='비밀번호를 입력해주세요.' v-model='data.credentials.password.original' type='password')
        div.w-full.my-2
            h3.font-light.text-sm(class='mb-0.5') 비밀번호 재입력
            Input(placeholder='비밀번호를 다시한번 입력해주세요.' v-model='data.credentials.password.retry' type='password')
        div.w-full.my-3
            h3.font-light.text-sm(class='mb-0.5') 전화번호
            div.w-full.flex.items-center
                div.flex-grow.min-w-0
                    Input(placeholder='전화번호를 입력해주세요.' :vMask="'+9'" v-model='data.phoneNumber' :disabled='certification.phoneNumber !== null')
                div.transition-all.overflow-x-hidden(:class="{ 'w-20 ml-2': data.phoneNumber.length >= 3, 'w-0': data.phoneNumber.length < 3 }")
                    Button.w-full.whitespace-nowrap(color='indigo' @click="$event => requestCertification($event, 'phoneNumber')" v-if='certification.phoneNumber    == null') 인증
                    Button.w-full.whitespace-nowrap(color='zinc' disabled='true' v-else) 인증완료
        div.w-full.my-3
            h3.font-light.text-sm(class='mb-0.5') 이메일 주소
            div.w-full.flex.items-center
                div.flex-grow.min-w-0
                    Input(placeholder='이메일 주소를 입력해주세요.' v-model='data.emailAddress' :disabled='certification.emailAddress !== null')
                div.transition-all.overflow-x-hidden(:class="{ 'w-20 ml-2': isValidEmail(data.emailAddress) == true, 'w-0': isValidEmail(data.emailAddress.length) == false }")
                    Button.w-full.whitespace-nowrap(color='indigo' @click="$event => requestCertification($event, 'emailAddress')" v-if='certification.emailAddress == null') 인증
                    Button.w-full.whitespace-nowrap(color='zinc' disabled='true' v-else) 인증완료
        div.w-full.my-2
            div.w-full.flex.items-center.gap-2
                div.w-32
                    h3.font-light.text-sm(class='mb-0.5') 성별
                    Select(:option=`$JSON.encode([
                        {
                            name: '성별',
                            description: '',
                            options: [
                                { name: '남성', value: 'male' },
                                { name: '여성', value: 'female' },
                                { name: '기타', value: 'other' }
                            ]
                        }
                    ])` :value='data.gender' @change='_value => data.gender = _value.after' placeholder='성별을 선택해주세요.')
                div.flex-grow.min-w-0
                    h3.font-light.text-sm(class='mb-0.5') 생년월일
                    Input.w-full(type='date' v-model='data.birthDate')
        div.w-full.my-6
            h3.font-semibold.text-sm 서비스 약관
            div.w-full.flex.justify-between.items-center.my-1
                h3.font-light.text-sm.cursor-pointer(@click="data.terms['tos'] = !(data.terms['tos'] ?? false)")
                    | 루나의 
                    span.transition-all.text-blue-400(class='hover:text-blue-500') 서비스 통합 이용약관
                    | 에 동의합니다.
                    span.ml-1.text-red-400 *
                CheckBox(:value="data.terms['tos']" @change="value => data.terms['tos'] = value")
            div.w-full.flex.justify-between.items-center.my-1
                h3.font-light.text-sm.cursor-pointer(@click="data.terms['privacy'] = !(data.terms['privacy'] ?? false)")
                    | 루나의 
                    span.transition-all.text-blue-400(class='hover:text-blue-500') 개인정보처리방침
                    | 에 동의합니다.
                    span.ml-1.text-red-400 *
                CheckBox(:value="data.terms['privacy']" @change="value => data.terms['privacy'] = value")
            div.w-full.flex.justify-between.items-center.my-1
                h3.font-light.text-sm.cursor-pointer(@click="data.terms['aup'] = !(data.terms['aup'] ?? false)")
                    | 루나의 
                    span.transition-all.text-blue-400(class='hover:text-blue-500') 서비스 사용목적의 제한 (AUP)
                    | 에 동의합니다.
                    span.ml-1.text-red-400 *
                CheckBox(:value="data.terms['aup']" @change="value => data.terms['aup'] = value")
            div.w-full.flex.justify-between.items-center.my-1
                h3.font-light.text-sm.cursor-pointer(@click="data.terms['marketing'] = !(data.terms['marketing'] ?? false)")
                    span.transition-all.text-blue-400(class='hover:text-blue-500') 마케팅 활용 및 광고 수신
                    | 에 동의합니다.
                CheckBox(:value="data.terms['marketing']" @change="value => data.terms['marketing'] = value")
            div.w-full.flex.justify-between.items-center.my-1.mt-4
                h3.font-medium.text-sm.cursor-pointer(@click='data.terms = Object.fromEntries(Object.keys(data.terms).map(_name => { return [ _name, (Object.keys(data.terms).map(_name => data.terms[_name]).filter(_value => _value == true).length == Object.keys(data.terms).length) == false ] }))') 약관 전체동의
                CheckBox(:value="Object.keys(data.terms).map(_name => data.terms[_name]).filter(_value => _value == true).length == Object.keys(data.terms).length" @change="value => data.terms = Object.fromEntries(Object.keys(data.terms).map(_name => { return [ _name, value ] }))")
        div.w-full.flex.justify-end.items-center.my-3
            Button(color='indigo') 회원가입
    div.w-full.flex.justify-center.items-center.gap-2
        NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index' }")
            i.far.fa-chevron-left.mr-2
            | 로그인으로 돌아가기
</template>