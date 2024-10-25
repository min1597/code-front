<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 사용자 이름 찾기
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            | 등록된 정보를 통해 사용자 이름을 확인해요.
    div.w-full.my-4
        div.w-full
            h3.font-light.text-sm(class='mb-0.5') 사용자 이름
            div.w-full.flex.items-center.gap-3
                div.flex-grow.min-w-0
                    Input
                //- Button(color='indigo') 인증
    div.w-full.flex.justify-center.items-center.gap-2
        NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index-find-account' }")
            i.far.fa-chevron-left.mr-2
            | 나의 계정찾기로 돌아가기
</template>