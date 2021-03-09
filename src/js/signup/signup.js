const $btn_next = document.querySelector('.signup__btn-next');
const $btn_pre = document.querySelector('.signup__btn-pre');
const $slider = document.querySelector('.signup__slider');
const $slides = $slider.querySelectorAll('.signup__slide-wrapper');
const $step = document.querySelector('.signup__step-num');

const slideSpeed = 300;
let sliderWidth = 1024;
let curIndex = 0;
let curSlide = $slides[curIndex];
let isFilled = {
    nick: false,
    photo: true, // fixed
    address: false,
    position: false,
    genre: false,
    artist: false,
}
const isFilledKeys = Object.keys(isFilled);

function updateStepState(e) {
    if (curIndex === 0) {
        $btn_pre.style.display = "none";
    } else {
        $btn_pre.style.display = "block";
    }

    curSlide = $slides[curIndex];
}

function checkFilled(i) {
    const key = isFilledKeys[i];
    
    return isFilled[key];
}

function moveNextSlide() {
    if (curIndex < 5) {
        $slider.style.transition = `${slideSpeed}ms`;
        $slider.style.transform = `translateX(-${sliderWidth * (curIndex+1)}px)`;
        curIndex++;
        $step.textContent = curIndex + 1;
        updateStepState();
    }
}

function movePreSlide() {
    if (curIndex > 0) {
        $slider.style.transition = `${slideSpeed}ms`;
        $slider.style.transform = `translateX(-${sliderWidth * (curIndex-1)}px)`;
        console.log(checkFilled(curIndex));
        curIndex--;
        $step.textContent = curIndex + 1;
        updateStepState();
    }
}

function init() {
    window.addEventListener('load', () => {
        if (window.innerWidth < 768) {
            sliderWidth = window.innerWidth;
        }
        updateStepState();
    });

    // 회원가입 슬라이더
    $btn_next.addEventListener('click', () => {
        if (checkFilled(curIndex)) {
            moveNextSlide();
        } else {
            alert('입력을 모두 완료해 주세요.');
        }
    });

    $btn_pre.addEventListener('click', () => {
        movePreSlide();
    });

    // 활동명 검사
    $nick.addEventListener('keyup', async (e) => {
        const { value } = e.target;
        $checkNick.textContent = await checkNickValid(value);
    })

    // 프로필 사진 업로드
    $browseBtn.addEventListener('click', () => {
        $imageInput.click();
    });

    $imageInput.addEventListener('change', readInputImg);

    // 주소검색
    let pageIndex = 1;
    let isEnd = false;
    let query = "";

    $btn_search.addEventListener("click", async () => {
        pageIndex = 1;
        query = $input.value;

        const data = await searchAddress(query, pageIndex);
        isEnd = data.meta.is_end;
        renderResult(data);
        console.log(pageIndex);
    })

    $btn_ad_next.addEventListener("click", async () => {
        if (!isEnd) {
            pageIndex++
            
            const data = await searchAddress(query, pageIndex);
            isEnd = data.meta.is_end;
            renderResult(data);
            console.log(pageIndex);
        } else {
            alert("마지막 페이지입니다.")
        }
    });

    $btn_ad_pre.addEventListener("click", async () => {
        if (pageIndex > 1) {
            pageIndex--;

            const data = await searchAddress(query, pageIndex);
            isEnd = data.meta.is_end;
            renderResult(data);
            console.log(pageIndex);
        } else {
            alert("첫번째 페이지입니다.")
        }
    });
}

init();