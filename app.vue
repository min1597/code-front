<script lang='ts' setup>
const { $loadingView } = useNuxtApp()
</script>

<template lang='pug'>
Toast
Modal
loading-view(:status='$loadingView.contents.length !== 0' :content='$loadingView.contents[0]')
NuxtPage
</template>

<style>
html {
  @apply bg-white;
  @apply dark:bg-black;
  @apply text-black;
  @apply dark:text-gray-300;
}
html, body, div#__nuxt, div#__layout {
  width: 100%;
  height: 100%;
}
body *:not(script):not(style):not(span) {
  display: block;
}
* {
  -webkit-box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -ms-box-sizing: border-box !important;
  box-sizing: border-box !important;
  font-family: Pretendard,system-ui,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue","Segoe UI","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",sans-serif;
}


.page-enter-active,.page-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.page-enter {
  opacity: 0;
  transform: translate3d(15px, 0, 0);
  height: 100%;
  width: 100%;
}
.page-leave-to {
  opacity: 0;
  transform: translate3d(-15px, 0, 0);
  height: 100%;
  width: 100%;
}
</style>