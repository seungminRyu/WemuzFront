const $browseBtn = document.querySelector(".browse-btn");
const $imageInput = document.querySelector(".image-input");
const $field = document.querySelector(".signup__input-field");
const $img = document.querySelector(".signup__img");

function readInputImg(e){
    var inputFile = e.target.files
    var trueFile = Array.prototype.slice.call(inputFile);

    if (!trueFile.type.match("image/.*")) {
        alert("이미지 파일만 선택 가능합니다.");
        return;
    }

    var reader = new FileReader;
    reader.onload((e) => {
        $img.src = `${e.target.result}`;
        $img.dataFile = `${trueFile.name}`
    });
    
    reader.readAsDataURL(trueFile);
}

function init() {
    $browseBtn.addEventListener('click', () => {
        $imageInput.click();
    });

    $imageInput.addEventListener('change', readInputImg);
}

window.addEventListener("load", init);