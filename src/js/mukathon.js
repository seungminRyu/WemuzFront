import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const $mentorSlider = document.querySelector(".Cooperation__mentor-slider");
// const $prevBtn = document.querySelector(".--previous-btn");
// const $nextBtn = document.querySelector(".--next-btn");
const $staffNav = document.querySelector(".staffs-nav");
const $staffNavItems = document.querySelectorAll(".staffs-nav__name");
const $staffInfoBoxs = document.querySelectorAll(".staffs__staff");

// 데스크탑 멘토소개 슬라이더
// let sliderWidth;
// let curIndex = 0;
// const singleSlideWidth = 1144;
// const slideSpped = 300;
// const viewPortWidth = window.innerWidth;
// const defaultPosition = -1144 + viewPortWidth/2 - 512;

// function onPrevBtn() {
//     if (curIndex > -1) {
//         $mentorSlider.style.transition = `${slideSpped}ms`;
//         $mentorSlider.style.transform = `translateX(${defaultPosition - singleSlideWidth * (curIndex-1)}px)`;
//         $slideArr[curIndex+1].classList.remove("--active-slide");
//         curIndex--;
//         $slideArr[curIndex+1].classList.add("--active-slide");
//         console.log(curIndex);
//     }
// }

// function onNextBtn() {
//     if (curIndex < 4) {
//         $mentorSlider.style.transition = `${slideSpped}ms`;
//         $mentorSlider.style.transform = `translateX(${defaultPosition - singleSlideWidth * (curIndex+1)}px)`;
//         $slideArr[curIndex+1].classList.remove("--active-slide");
//         curIndex++;
//         $slideArr[curIndex+1].classList.add("--active-slide");
//         console.log(curIndex);
//     }
// }

function setMobileSwiper() {
    var mentorSwiper = new Swiper('.Cooperation__swiper-container', {
        cssWidthAndHeight: true,
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        pagination: {
            el: '.Cooperation__swiper-pagination',
            clickable: true,
        },
    });
}

function setDesktopSlider() {
    var mentorSlider = new Swiper('.Cooperation__swiper-container', {
        cssWidthAndHeight: true,
        slidesPerView: 1,
        spaceBetween: 120,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}

function setScheduleSwiper(mediaQuery) {
    if (mediaQuery.matches) {
        var scheduleSwiper = new Swiper('.Schedule__swiper-container', {
            cssWidthAndHeight: true,
            slidesPerView: 1,
            spaceBetween: 12,
            loop: true,
            pagination: {
                el: '.Schedule__swiper-pagination',
                clickable: true,
            },
        });
    }
}

function setMentorSlider(mediaQuery) {
    if (mediaQuery.matches) {
        setMobileSwiper();
    } else {
        setDesktopSlider();
    }
}

function setStaffMenu() {
    $staffNavItems[0].addEventListener("click", (e) => {
        $staffNav.querySelector(".--active-name").classList.remove("--active-name");
        e.target.classList.add("--active-name")

        $staffInfoBoxs[1].classList.remove("--active-staff");
        $staffInfoBoxs[0].classList.add("--active-staff");
    })

    $staffNavItems[1].addEventListener("click", (e) => {
        $staffNav.querySelector(".--active-name").classList.remove("--active-name");
        e.target.classList.add("--active-name")

        $staffInfoBoxs[0].classList.remove("--active-staff");
        $staffInfoBoxs[1].classList.add("--active-staff");
    })
}

function init() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    //setScheduleSwiper(mediaQuery);
    //setMentorSlider(mediaQuery);
    setStaffMenu();
}

init();