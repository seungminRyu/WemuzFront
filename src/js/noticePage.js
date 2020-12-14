/*
 * 날짜: 2020/12/14
 * 작성자: 유승민
 * 설명: 공지사항 페이지에 각 메뉴를 클릭할시 해당 메뉴의 내용을 html에 렌더링한다.
 */

import { policyContents } from "./policyContents.js";

const $policyMenu = document.querySelector(".policy-menu"); // 공지사항 페이지 네비게이션 바
const $contents = document.querySelector(".contents");  // 페이지 메인 컨텐츠
const menuTitles = ["이용약관", "개인정보처리방침", "운영정책", "공지사항"];

for(let i=0; i<4; i++) {
    // 네비게이션 바의 각 메뉴(자식)들의 클릭 이벤트를 설정한다.
    $policyMenu.children[i].addEventListener("click", (e) => {
        $policyMenu.querySelector(".activate-menu").classList.remove("activate-menu");
        e.target.classList.add("activate-menu");
        
        document.querySelector("title").innerText = `위뮤즈 | ${menuTitles[i]}`;
        $contents.innerHTML = policyContents[i];
        
        // 각각의 공지사항은 클릭 시 해당 글이 나와야함으로 클릭 이벤틀르 설정한다.
        if (i === 3) {
            $contents.innerHTML = policyContents[i];
            const $noticeHeader = document.querySelector(".notice-header");
            const $noticeContents = document.querySelector(".notice-contents");
            
            $noticeHeader.addEventListener("click", () => {
                $noticeHeader.classList.toggle("activate-table");
                $noticeContents.classList.toggle("activate-table");
            });
        }
    });
}