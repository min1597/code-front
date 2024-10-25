<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 로그인
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            span.font-medium.mr-1 루나 네트워크
            | 에 루나 통합계정으로 로그인해요.
    div.w-full.my-4
        div.w-full.my-3
            h3.font-light.text-sm(class='mb-0.5') 사용자 이름
            Input(placeholder='사용자 이름을 입력해주세요.')
        div.w-full.my-3
            h3.font-light.text-sm(class='mb-0.5') 비밀번호
            Input(placeholder='비밀번호를 입력해주세요.')
        div.w-full.flex.justify-end.items-center.my-3
            Button.px-8(color='indigo') 로그인
        div.w-full.flex.justify-end.items-center.gap-2
            NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index-find-account' }") 나의 계정찾기
            span &middot;
            NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index-signup' }") 회원가입
        div.w-full.grid.grid-cols-2.gap-2.mt-4
            Button.col-span-1.text-white(class='bg-[#2DB400] hover:bg-[#219800] disabled:bg-[#138100]')
                i.xi-naver.mr-1
                | Naver
            Button.col-span-1.text-black(class='bg-[#FEE500] hover:bg-[#E0BF00] disabled:bg-[#B29300]')
                i.xi-kakaotalk.mr-1
                | Kakaotalk
            Button.col-span-1.text-white(class='bg-[#4267B2] hover:bg-[#38569F] disabled:bg-[#1B3E7C]')
                i.xi-facebook.mr-1
                | Facebook
            Button.col-span-1.text-white(class='bg-[#DB4437] hover:bg-[#CA3927] disabled:bg-[#A92013]')
                i.xi-google.mr-1
                | Google
</template>