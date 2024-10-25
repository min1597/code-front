<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 나의 계정찾기
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            | 잃어버린 계정 정보를 복구해요.
    div.w-full.my-4
        div.flex.flex-wrap.gap-2
            NuxtLink.transition-all.w-full.flex.justify-between.items-center.px-4.py-3.border.border-zinc-200.rounded-lg.cursor-pointer(class='dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900' :to="{ name: 'index-find-account-username' }")
                span
                    h3.font-semibold.text-md 사용자 이름 찾기
                    h3.font-light.text-sm 이메일 주소를 이용하여 사용자 이름 찾기
                i.fas.fa-chevron-right
            NuxtLink.transition-all.w-full.flex.justify-between.items-center.px-4.py-3.border.border-zinc-200.rounded-lg.cursor-pointer(class='dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900' :to="{ name: 'index-find-account-password' }")
                span
                    h3.font-semibold.text-md 비밀번호 재설정
                    h3.font-light.text-sm 본인인증 하여 비밀번호 재설정
                i.fas.fa-chevron-right
    div.w-full.flex.justify-center.items-center.gap-2
        NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index' }")
            i.far.fa-chevron-left.mr-2
            | 로그인으로 돌아가기
</template>