let cnt = 0;

const countUp = (e) => {
    const isCheck = e.target.checked;

    if (isCheck) {
        cnt++;
    } else {
        cnt--;
    }

    if (cnt > 3) {
        alert('선택은 최대 3개까지 가능합니다.');
        e.target.checked = false
        cnt--;
    }
}