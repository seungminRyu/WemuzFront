const $browseBtn = document.querySelector('.signup__browse-btn'),
    $imageInput = document.querySelector('.image-input'),
    $field = document.querySelector('.signup__input-field'),
    $img = document.querySelector('.signup__img');

function readInputImg(e) {
    const { 0: inputFile } = e.target.files;

    if (!inputFile.type.match("image/.*")) {
        alert('이미지 파일만 선택 가능합니다.');
        e.target.value = '';
        return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
        $img.src = `${e.target.result}`;
        $img.dataFile = `${inputFile}`;
    };
    reader.readAsDataURL(inputFile);
}