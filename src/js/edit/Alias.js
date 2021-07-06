let timer = null;

const debouncer = (callback, delay) => {
    if (timer !== null) {
        clearTimeout(timer)
    }
    timer = setTimeout(callback, delay);
}

export default class Alias {
    constructor({ target }) {
        this.$target = target;
        this.state = {
            isValid: false,
        }
        this.elements = {
            $input: this.$target.querySelector('.data-input'),
            $errorText: this.$target.querySelector('.error-text'),
        }

        this.initEvent();
    }

    initAliasInputEvent = () => {
        const checkIsKor = (char) => {
            if (escape(char).length > 4) {
                return true;
            } else {
                return false;
            }
        }

        const checkKorValid = (alias) => {
            let korCheck = /[가-힣]/;

            for (let i = 0; i < alias.length; i++) {
                const char = alias.charAt(i)
                // 문자가 한글일 경우 유효성 검사 실행
                if (checkIsKor(char)) {
                    if (korCheck.test(char)) {
                        continue;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }

        const checkIsExist = async (alias) => {
            try {
                // const res = await fetch(`https://wemuz.me/api/v1/musicians/alias/?alias=${alias}`, {
                const res = alias === '하이' ? 
                    await fetch(`https://dd4e85e7-9286-4729-93bf-0bcae7acd922.mock.pstmn.io/musicians/alias/?alias=hihi`, {
                        method: 'GET',
                    }) :
                    await fetch(`https://dd4e85e7-9286-4729-93bf-0bcae7acd922.mock.pstmn.io/musicians/alias/?alias=haha`, {
                        method: 'GET',
                    })
                
                if (res.ok) {
                    const { code } = await res.json()
                    
                    if (code === 'OK') {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    throw new Error(`status code: ${res.status}`);
                }
        
            } catch (e) {
                return false;
            }
        }        

        const setIsValid = (validState) => {
            if (validState === 'VALID') {
                this.state.isValid = true;
            } else {
                this.state.isValid = false
            }
        }

        const setErrorMessage = (validState) => {
            switch (validState) {
                case 'INVALID_EMPTY':
                    this.state.errorMessage = "활동명을 입력해주세요.";
                    break
                case 'INVALID_SPACE':
                    this.state.errorMessage = "활동명에 빈칸을 포함 할 수 없습니다.";
                    break
                case 'INVALID_SHORT':
                    this.state.errorMessage = "활동명이 너무 짧습니다.";
                    break
                case 'INVALID_LONG':
                    this.state.errorMessage = "활동명이 너무 깁니다. (10자 이내)";
                    break
                case 'INVALID_SYMBOL':
                    this.state.errorMessage = "활동명에 특수문자를 포함시킬 수 없습니다.";
                    break
                case 'INVALID_WRONG_KOR':
                    this.state.errorMessage = "올바르지 않은 형식입니다.";
                    break
                case 'INVALID_EXIST':
                    this.state.errorMessage = "이미 존재하는 활동명 입니다.";
                    break
                case 'VALID':
                    this.state.errorMessage = "사용할 수 있는 활동명 입니다.";
                    break
            }
        }

        const checkAliasValid = async (alias) => {
            const aliasLength = alias.length;
            let specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
            let validState = "";
        
            // 활동명 입력 여부 확인
            if (alias == null || alias == "") {
                validState = 'INVALID_EMPTY';
        
            // 활동명 빈칸 포함 확인
            } else if (alias.search(/\s/) != -1) {
                validState = 'INVALID_SPACE';
        
            // 활동명 길이 제한 확인
            } else if (aliasLength < 2 || aliasLength > 10) {
                if (aliasLength < 2) {
                    validState = 'INVALID_SHORT';
                } else {
                    validState = 'INVALID_LONG';
                }
        
            // 활동명 특수문자 포함 확인
            } else if (specialCheck.test(alias)) {
                validState = 'INVALID_SYMBOL';
        
            // 활동명 유효 한글인지 확인
            } else if (!checkKorValid(alias)) {
                validState = 'INVALID_WRONG_KOR';
        
            // 활동명 중복 확인
            } else {
                const respone = await checkIsExist(alias);
        
                if (respone) {
                    validState = 'VALID';
                } else {
                    validState = 'INVALID_EXIST';
                }
            }
        
            return validState;
        }

        const onAliasInput = async (val) => {
            const inputAlias = val;
            const validState = await checkAliasValid(inputAlias);

            setIsValid(validState);
            setErrorMessage(validState);
            this.render();
        }

        this.elements.$input.addEventListener('keyup', (e) => {
            debouncer(() => {
                onAliasInput(e.target.value);
            }, 300);
        });
    }

    renderError() {
        const curErrorMessage = this.state.errorMessage;
        this.elements.$errorText.innerText = curErrorMessage;
    }

    initEvent() {
        this.initAliasInputEvent();        
    }

    render() {
        this.renderError();
    }
}
