<template lang='pug'>
div.w-full.p-3
    div.w-full
        h3.font-normal.text-lg
            span.font-bold 권한 승인
            span.mx-2 |
            span.font-bold Luna Accounts
        h3.font-light.text-sm(class='-mt-0.5')
            span.font-medium.mr-1 루나 네트워크
            | 에 아래의 권한이 제공되요.
    div.w-full.my-4
        div.w-full
            div.w-full.flex.justify-between.items-center.my-3
                span.flex.justify-start.items-center.gap-2.text-md
                    i.fas.fa-user-circle
                    h3.font-light
                        | 사용자의
                        span.font-medium.mx-1 고유식별코드
                        | 을(를) 제공해요.
                CheckBox
            div.w-full.flex.justify-between.items-center.my-3
                span.flex.justify-start.items-center.gap-2.text-md
                    i.fas.fa-user-circle
                    h3.font-light
                        | 사용자의
                        span.font-medium.mx-1 고유식별코드
                        | 을(를) 제공해요.
                Toggle
            div.w-full.flex.justify-between.items-center.my-3
                span.flex.justify-start.items-center.gap-2.text-md
                    i.fas.fa-user-circle
                    h3.font-light
                        | 사용자의
                        span.font-medium.mx-1 고유식별코드
                        | 을(를) 제공해요.
                CheckBox
            div.w-full.flex.justify-between.items-center.my-3
                span.flex.justify-start.items-center.gap-2.text-md
                    i.fas.fa-user-circle
                    h3.font-light
                        | 사용자의
                        span.font-medium.mx-1 고유식별코드
                        | 을(를) 제공해요.
                CheckBox
        div.w-full.flex.justify-end.items-center.my-3
            Button.px-8(color='indigo') 로그인
</template>