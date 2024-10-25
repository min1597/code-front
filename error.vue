<script setup lang='ts'>
import type { NuxtError } from '#app'
import { useRoute } from 'vue-router'
import CryptoJS from 'crypto-js'

const { $toast, $router } = useNuxtApp()

const props = defineProps({
  error: Object as () => NuxtError
})
const $route = useRoute()
function encodeError (_object: object) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(_object)))
}
function copy (_text: string) {
  navigator.clipboard.writeText(_text)
  $toast.add('success', '오류 내용이 담긴 코드가 복사되었어요.<br>고객센터에 코드를 전송하여 자세한 도움을 받아보세요.')
}
</script>

<template lang='pug'>
Toast
div.w-screen.h-screen.flex.justify-center.items-center.px-3.bg-indigo-100(class='dark:bg-zinc-900')
  div.w-full.max-w-3xl.rounded-xl.bg-white.shadow-md.px-3.py-5(class='dark:bg-zinc-800')
    div(class='max-sm:mx-3 min-md:mx-5 min-lg:mx-8 dark:text-zinc-300')
      h3.font-semibold.text-xl 오류가 발생했어요.
      h3.font-light.text-md 자세한 내용은 아래 오류 정보를 확인해주세요.
      hr.w-full.border-black.border-dashed.my-3(class='dark:border-zinc-300')
      div.w-full.flex.justify-start.flex-wrap
        h3.w-16 응답코드
        h3.font-medium.max-w-lg.overflow-x-auto {{ error.statusCode }}
      div.w-full.flex.justify-start.flex-wrap
        h3.w-16 오류내용
        h3.font-medium.max-w-lg.overflow-x-auto {{ error.statusMessage }}
      div.w-full.flex.justify-start.flex-wrap
        h3.w-16 요청경로
        h3.font-medium.max-w-lg.overflow-x-auto {{ $route.path }}
      div.w-full.flex.justify-start.flex-wrap
        h3.w-16 오류코드
        h3.text-blue-400.font-medium.cursor-pointer.ml-2(@click='copy(encodeError({ ... error, route: $route, occuredDate: new Date() }))')
          i.fas.fa-copy.mr-1
          | 복사하기
</template>