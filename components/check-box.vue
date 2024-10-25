<script setup lang='ts'>
const data: {
    value: boolean,
} = reactive({
    value: false,
})
defineOptions({
    inheritAttrs: false
})
const props = defineProps<{
    value: boolean
}>()
const emit = defineEmits([
    'change',
    'click'
])
watch(() => props.value, function () {
    data.value = props.value
})
onMounted(() => {
    data.value = props.value ?? false
})
</script>
<template lang='pug'>
div#checkbox.w-4.h-4.rounded.border.border-gray-300.shadow-lg.cursor-pointer(class='dark:border-gray-700' :class="{ 'bg-indigo-500 border-indigo-500 dark:border-indigo-500 indigo-shadow active': data.value == true }" @click="() => { data.value = !data.value; emit('change', data.value) }")
    i
</template>
<style lang='css'>
.indigo-shadow {
    box-shadow: 0 0 15px rgb(99 102 241/var(--tw-bg-opacity));
}
.red-shadow {
    box-shadow: 0 0 15px rgb(239 68 68/var(--tw-bg-opacity));
}
.opacity-enter-active {
    animation: opacity-in .1s;
}
.opacity-leave-active {
    animation: opacity-in .1s reverse;
}
@keyframes opacity-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
#checkbox {
    position: relative;
    display: inline-block;
}
#checkbox i  {
    display: block;
    position: relative;
    width: 14px;
    height: 14px;
    margin-left: 5.83px;
    margin-top: 4.14px;
    transform: rotate(-45deg) translateX(0%) translateY(0%) scale(0.8);
    transform-origin: center left;
}
#checkbox i:before  {
    content: '';
    display: block;
    height: 0;
    top: 50%;
    left: 0;
    width: 2.1px;
}
#checkbox i:after  {
    content: '';
    display: block;
    width: 0;
    bottom: 0;
    left: 0;
    height: 2.1px;
}
#checkbox.active i:before  {
    height: 35%;
    border-radius: 4px 4px 0 0;
    transition: height 300ms cubic-bezier(0.895, 0.03, 0.685, 0.22);
    background: #FFFFFF;
    margin-bottom: -0.1px;
}
#checkbox.active i:after  {
    width: 80%;
    border-radius: 0 4px 4px 0;
    transition: width 300ms 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
    background: #FFFFFF;
}

#checkbox.active i:before  {
    height: 35%;
    transition: height 300ms cubic-bezier(0.895, 0.03, 0.685, 0.22);
    background: #FFFFFF;
}
#checkbox.active i:after  {
    width: 80%;
    transition: width 300ms 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
    background: #FFFFFF;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>