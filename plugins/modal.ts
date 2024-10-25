import dayjs from 'dayjs'
class Modal {
    public modals: Array<{ srl: number, type: 'alert' | 'form', title: string, content: string, forms?: Array<{ type: 'input' | 'select' | 'file' | 'toggle', title: string, name: string, placeholder: string, options?: Array<{ name: string, value: string }>, value?: string }>, isForced?: boolean, callback?: Function, buttonText?: { cancel: string, continue?: string }, isActive: boolean }> = reactive(new Array())

    public add (_type: 'alert' | 'form', _title: string, _content: string, _forms?: Array<{ type: 'input' | 'select' | 'file' | 'toggle', title: string, name: string, placeholder: string, options?: Array<{ name: string, value: string }>, value?: string }>, _isForced?: boolean, _callback?: Function, _buttonText?: { cancel: string, continue?: string }): void {
        const _srl = this.modals.length
        if(_forms) {
            if(_forms.filter(_form => { return _form.type == 'select' && typeof _form.options == 'undefined' }).length !== 0) throw 'Invalid request.'
        }
        this.modals.push({
            srl: _srl,
            type: _type,
            title: _title,
            content: _content,
            forms: _forms,
            isForced: _isForced,
            callback: _callback,
            buttonText: _buttonText,
            isActive: true
        })
    }
    public addHttpError (_content: string, _status: number, _isForced: boolean = false) {
        this.modals.push({
            srl: this.modals.length,
            type: 'alert',
            title: '오류 :: ERROR',
            content: `
                <h3 class='text-sm'>요청을 처리하는데 실패하였습니다.</h3>
                <h3 class='text-xs'>Failed to process your request.</h3>
                <div class='mt-2 w-full px-3 py-2 border rounded-lg'>
                    <h3 class='font-semibold text-md'>오류 상세정보</h3>
                    <div class='flex justify-start items-center gap-3'>
                        <h3 class='font-light text-xs'>내용</h3>
                        <h3 class='font-regular text-sm'>${ _content }</h3>
                    </div>
                    <div class='flex justify-start items-center gap-3'>
                        <h3 class='font-light text-xs'>응답코드</h3>
                        <h3 class='font-regular text-sm'>${ _status }</h3>
                    </div>
                    <div class='flex justify-start items-center gap-3'>
                        <h3 class='font-light text-xs'>발생일시</h3>
                        <h3 class='font-regular text-sm'>${ dayjs().format('YYYY년 MM월 DD일 HH시 mm분 ss초 (Z)') }</h3>
                    </div>
                </div>
            `,
            forms: undefined,
            isForced: _isForced,
            callback: undefined,
            buttonText: undefined,
            isActive: true
        })
    }
}

export default defineNuxtPlugin((_nuxtApp): {
    provide: {
        modal: Modal
    }
} => {
    return {
        provide: {
            modal: new Modal()
        }
    }
})