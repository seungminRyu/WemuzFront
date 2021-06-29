export default class Avatar {
    constructor({ target }) {
        this.$target = target;
        this.state = {
            isValid: true,
        }
        this.elements = {
            $input: this.$target.querySelector('.data-input'),
            $avatarImg: this.$target.querySelector('.user-avatar-img'),
        }

        this.initEvent();
    }

    initImgInputEvent() {
        const setAvatarImg = (inputFile) => {
            let reader = new FileReader();

            reader.onload = (e) => {
                this.elements.$avatarImg.src = `${e.target.result}`;
                this.elements.$avatarImg.dataFile = `${inputFile}`;
            }
            reader.readAsDataURL(inputFile);
        }

        const checkInputDataType = (inputFile) => {

            if (!inputFile.type.match('image/.*')) {
                alert('이미지 파일만 선택 가능합니다.');
                e.target.value = '';
                return false;
            } else {
                return true;
            }
        }

        const onAvatarInput = (e) => {
            const { 0: inputFile } = e.target.files;
            
            if (!checkInputDataType(inputFile)) return;
            setAvatarImg(inputFile);
        }

        this.elements.$input.addEventListener('change', onAvatarInput);
    }

    initEvent() {
        this.initImgInputEvent();
    }
}

// const $browseBtn = document.querySelector('.signup__inputBtn');
// const $imageInput = document.querySelector('.image-input');
// const $field = document.querySelector('.signup__input-field');
// const $img = document.querySelector('.signup__profilePreview');

// function readInputImg(e) {
//     const { 0: inputFile } = e.target.files;

//     if (!inputFile.type.match("image/.*")) {
//         alert('이미지 파일만 선택 가능합니다.');
//         e.target.value = '';
//         return;
//     }

//     let reader = new FileReader();
//     reader.onload = (e) => {
//         $img.src = `${e.target.result}`;
//         $img.dataFile = `${inputFile}`;
//     };
//     reader.readAsDataURL(inputFile);
// }

// function photoInit() {
//     // 프로필 사진변경 클릭시 input 클릭
//     $browseBtn.addEventListener('click', () => {
//         $imageInput.click();
//     });

//     // 프로필 사진변경
//     $imageInput.addEventListener('change', readInputImg);
// }