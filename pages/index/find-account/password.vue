<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 비밀번호 재설정
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            | 본인인증을 통해 비밀번호를 재설정해요.
    div.w-full.my-4

    div.w-full.flex.justify-center.items-center.gap-2
        NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index-find-account' }")
            i.far.fa-chevron-left.mr-2
            | 나의 계정찾기로 돌아가기
</template>