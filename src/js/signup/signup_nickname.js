
const $nick = document.querySelector('.signup__nick');
const $checkNick = document.querySelector('.signup__check-nick');

async function checkIsExist(nickname) {
    try {
        const res = await fetch(`https://wemuz.me/api/v1/musicians/alias/?alias=${nickname}`, {
            method: 'GET',
        }); 

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`데이터를 가져오지 못 했습니다.: ${res.status}`);
        }
    } catch (e) {
        throw new Error(`서버 통신 중 에러가 발생하였습니다.: ${e.message}`);
    }
}

// 문자가 한글인지 확인
function checkIsKor(char) {
    if (escape(char).length > 4) {
        return true;
    } else {
        return false;
    }
}

// 유효한 한글인지를 판단.
function checkKorValid(nickname) {
    let korCheck = /[가-힣]/;
    for (let i=0; i<nickname.length; i++) {
        char = nickname.charAt(i)

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

async function checkNickValid(nickname) {
    let nickLength = 0;
    let specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    let res = "";

    const INVALID_EMPTY = "활동명을 입력해주세요.";
    const INVALID_SPACE = "활동명에 빈칸을 포함 할 수 없습니다.";
    const INVALID_SHORT = "활동명이 너무 짧습니다.";
    const INVALID_LONG = "활동명이 너무 깁니다. (10자 이내)";
    const INVALID_SYMBOL = "활동명에 특수문자를 포함시킬 수 없습니다.";
    const INVALID_KOR = "올바르지 않은 형식입니다.";
    const INVALID_EXIST = "이미 존재하는 활동명 입니다.";
    const VALID = "사용할 수 있는 활동명 입니다 :)";

    // 활동명 길이 구함
    for (let i=0; i<nickname.length; i++) {
        char = nickname.charAt(i);

        // 한글은 2, 영문은 1로 치환
        if (checkIsKor(char)) {
            nickLength += 2;
        } else {
            nickLength += 1;
        }
    }

    // 활동명 필수 입력
    if (nickname == null || nickname == "") {
        res = INVALID_EMPTY;
    
    // 활동명 빈칸 포함 안됨
    } else if (nickname.search(/\s/) != -1) {
        res = INVALID_SPACE;

    // 활동명 길이 제한
    } else if (nickLength < 2 || nickLength > 20) {
        if (nickLength < 2) {
            res = INVALID_SHORT;
        } else {
            res = INVALID_LONG;
        }
    
    // 활동명 특수문자 포함 검사
    } else if (specialCheck.test(nickname)) {
        res = INVALID_SYMBOL;

    // 활동명 유효 한글 검사
    } else if (!checkKorValid(nickname)) {
        res = INVALID_KOR;

    // 활동명 중복 검사
    } else {
        const { code: isExist } = await checkIsExist(nickname);
        
        if (isExist === 'OK') {
            res = VALID;
        } else {
            res = INVALID_EXIST;
        }
        
    } 

    if (res === VALID) {
        isFilled.nick = true;
    } else {
        isFilled.nick = false;
    }
    return res;
}