class Debouncer {
    constructor(delay, callback) {
        this.timer = null;
        this.delay = delay;
        this.callback = callback;
    }

    call() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.callback, this.delay);
    }
}

export default class Introduce {
    constructor(target, isValid = false) {
        this.$target = target;
        this.state = {
            isValid: isValid,
        }
        this.$introduce = this.$target.querySelector(".data-input");
        this.$textCount = this.$target.querySelector('.count-num');
        this.$errorText = this.$target.querySelector('.error-text');
        this._debouncer = null;

        this.init();
    }
    initTextAreaKeyupEvent() {
        const setValidState = (validState) => {
            this.state.isValid = validState;
            console.log('update valid: ', this.state.isValid);
        }

        const renderErrorText = (errorText) => {
            this.$errorText.innerText = errorText;
        }

        const checkTextLengthValid = (textLength) => {
            const errorText = textLength > 150 ?
                '소개 메시지는 최대 150자 이내로 작성해주세요.' :
                '';
            const validState = textLength > 150 ? false : true;

            setValidState(validState);
            renderErrorText(errorText);
        }

        const renderCounter = (textLength) => {
            this.$textCount.innerText = textLength;
        }

        const onTextArea = (e) => {
            const textLength = e.target.value.length;

            checkTextLengthValid(textLength);
            renderCounter(textLength);
        }

        this._debouncer = new Debouncer(300, );
        this.$introduce.addEventListener('keyup', (e) => {
            this._debouncer.call(e);
        });
    }

    initEvent() {
        this.initTextAreaKeyupEvent();
    }

    init() {
        this.initEvent();
    }
}