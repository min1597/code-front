<script setup lang='ts'>
import axios from 'axios'

const { $modal, $sessionInitlization, $loadingView, $toast, $user } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const runtimeConfig = useRuntimeConfig()

const data: {
    loadedQR: boolean
} = reactive({
    loadedQR: false
})

let _loader: { success: true, solve: () => boolean }
onBeforeMount(async () => {
    _loader = $loadingView.addLoad('세션을 불러오는 중')
    await $sessionInitlization()
    _loader.solve()
    try {
        _loader = $loadingView.addLoad('세션 검증 중')
        const _sessionResult: { success: true, data: any, status: number, raw?: any } | { success: false, error: string, status: number, raw?: any } = await new Promise((_resolve, _reject) => {
            axios.get(`${ runtimeConfig.public.apiEndpoint }/v0/session`, { headers: { authorization: window.localStorage.getItem('session') } })
                .then(_result => _resolve({ success: true, data: _result.data, status: _result.status, raw: _result }))
                .catch(_error => _resolve({ success: false, error: _error.response.data.error, status: _error.response.status, raw: _error }))
        })
        if(_sessionResult.success == true) {
            _loader.solve()
            if(window.innerWidth >= 768) {
                setTimeout(() => {
                    data.loadedQR = true
                }, 1000)
            }
        } else {
            throw $toast.add('danger', '세션을 불러오는데 실패하였습니다.')
        }
    } catch(_error) {
        _loader.solve()
    }
})
</script>
<template lang='pug'>
div.w-full.h-full.flex.justify-center.items-center.pt-16.overflow-y-auto.flex-wrap
    div.max-w-md.w-full.my-16
        NuxtPage
    template(v-if="[ 'index' ].includes(route.name)")
        template(v-if='data.loadedQR')
            div.w-80.flex.justify-center.items-center(class='max-sm:hidden')
                span.text-center
                    div.mx-auto.w-40.h-40.bg-zinc-400.mb-4
                    h3.font-semibold.text-lg QR로 로그인
                    div.px-3.py-2.border.rounded-lg 휴대폰으로 QR을 스캔한 후 93를 선택하쇼
    div.w-full.border-t.border-zinc-300(class='dark:border-zinc-700')
        div.w-full(class='max-sm:px-2 min-md:px-4 min-lg:px-8')
            div.w-full.flex.justify-center.items-center.flex-wrap.my-2
                h3.font-light.text-sm.text-blue-400.mx-2.cursor-pointer 이용약관
                h3.font-light.text-sm.text-blue-400.mx-2.cursor-pointer 개인정보처리방침
                h3.font-light.text-sm.text-blue-400.mx-2.cursor-pointer 한국어
                h3.font-light.text-sm.text-blue-400.mx-2.cursor-pointer English
</template>