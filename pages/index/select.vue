<script setup lang='ts'>
import { vOnLongPress } from '@vueuse/components' 

const { $loadingView, $modal } = useNuxtApp()

function logout (_type: 'desktop' | 'mobile') {
    if(_type == 'mobile' && window.innerWidth <= 767 || _type == 'desktop' && window.innerWidth > 767) {
        $modal.add('form', '로그아웃', '정말로 "minjae10005" 계정을 로그아웃 하시겠습니까?', [  ], false, () => {

        }, { cancel: '취소', continue: '로그아웃' })
    } else return
}
</script>
<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 로그인
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            span.font-medium.mr-1 루나 네트워크
            | 에 로그인 할 루나 통합계정을 선택해주세요.
    div.w-full.my-4
        div.flex.flex-wrap.gap-2
            div.group.transition-all.relative.w-full.flex.justify-between.items-center.px-5.py-4.rounded-lg.border.border-zinc-200(class='hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-zinc-600 min-md:hover:mr-10 min-md:hover:-ml-10 min-md:hover:rounded-r-none' v-on-long-press.prevent="() => { logout('mobile') }")
                div.flex-grow.min-w-0.flex.justify-start.items-center.cursor-pointer
                    span.w-10.h-10.mr-4.rounded-full.bg-zinc-500
                    span
                        h3.font-semibold.text-md Admin
                        h3.font-light.text-sm(class='-mt-0.5') emailAddress
                div.transition-all.absolute.w-24.h-full.-right-24.pl-2.opacity-0(class='group-hover:opacity-100 max-sm:hidden')
                    div.transition-all.w-full.h-full.bg-red-600.rounded-r-lg.cursor-pointer.border.border-red-600.flex.justify-center.items-center(class='hover:bg-red-700' @click="logout('desktop')")
                        div.text-center.text-white
                            i.fas.fa-trash-alt
                            h3.font-medium.text-sm 로그아웃
        h3.font-light.text-right.text-xs.text-indigo-500.mt-3(class='min-md:hidden') * 계정을 길게 눌러 로그아웃
    div.w-full.flex.justify-center.items-center.gap-2
        NuxtLink.transition-all.font-light.text-sm.text-blue-400.cursor-pointer(class='hover:text-blue-500' :to="{ name: 'index' }")
            i.far.fa-chevron-left.mr-2
            | 새로운 계정으로 로그인
</template>