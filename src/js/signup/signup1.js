async function checkIsExist(nickname) {
    const res = await fetch(`https://wemuz.me/api/v1/musicians/alias/?alias=${nickname}`, {
        method: 'GET',
    })

    return res.json();   
}


// 한글인지 확인
function checkIsKor(char) {
    if (escape(nick).length > 4) {
        return true;
    } else {
        return false;
    }
}

// 유효한 한글인지 판단
function checkKorValid(nickname) {
    var korCheck = /[가-힣]/;
    for (var i=0; i<nickname.length; i++) {
        nick = nickname.charAt(i);

        // 문자가 한글일 경우 유효성 검사 실행
        if (checkIsKor(nick)) {
            if (korCheck.test(nick)) {
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

async function checkNickValid(nickname) {
    var nickLength = 0;
    var engCheck = /[a-z]/;
    var numCheck = /[0-9]/;
    var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    const INVALID_EMPTY = "활동명을 입력해주세요.";
    const INVALID_SPACE = "활동명에 빈칸을 포함 할 수 없습니다.";
    const INVALID_SHORT = "활동명이 너무 짧습니다.";
    const INVALID_LONG = "활동명이 너무 깁니다. (10자 이내)";
    const INVALID_SYMBOL = "활동명에 특수문자를 포함시킬 수 없습니다.";
    const INVALID_KOR = "올바르지 않은 형식입니다.";
    const INVALID_EXIST = "이미 존재하는 활동명 입니다.";
    const VALID = "사용할 수 있는 활동명 입니다 :)";

    // 한글, 영문 길이 2, 1로 바꾸기
    for (var i=0; i<nickname.length; i++) {
        nick = nickname.charAt(i);

        // 한글은 2, 영문은 1로 치환
        if (checkIsKor(nick)) {
            nickLength += 2;
        } else {
            nickLength += 1;
        }
    }

    // 닉네임 필수 입력
    if (nickname == null || nickname == "") {
        return INVALID_EMPTY

    // 닉네임 빈칸 포함 안됨
    } else if (nickname.search(/\s/) != -1) {
        return INVALID_SPACE

    // 닉네임 한글 1~10자, 영문 및 숫자 2~20자
    } else if (nickLength < 2 || nickLength > 20) {
        if (nickLength < 2) {
            return INVALID_SHORT
        } else {
            return INVALID_LONG
        }
    
    // 닉네임 특수문자 포함안됨
    } else if (specialCheck.test(nickname)) {
        return INVALID_SYMBOL
    
    // 닉네임 유효 한글 검사
    } else if (!checkKorValid(nickname)) {
        return INVALID_KOR

    // 닉네임 중복검사
    } else {
        const isExist = await checkIsExist(nickname);
        console.log(isExist)
        const { code } = isExist;
        
        if (code === "OK") {
            return VALID
        } else {
            return INVALID_EXIST;
        }
    }
}

function init() {
    const $nick = document.querySelector(".signup__nick");
    const $check = document.querySelector(".signup__check-nick");

    $nick.addEventListener("keyup", async (e) => {
        const { value } = e.target
        $check.textContent = await checkNickValid(value);
    });
}

init();
