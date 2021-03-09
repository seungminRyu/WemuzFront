const $warning = document.querySelector('.signup__artist-warning');
let cnt = 0;

function onArtist(e) {
    const isCheck = e.target.checked;
    
    if ($warning.innerHTML) {
        $warning.innerHTML = "";
    }

    if (isCheck) {
        if (cnt < 3) {
            cnt++;
            isFilled.artist = true
        } else {
            $warning.innerHTML = "최대 3개 까지 선택 가능합니다."
            e.target.checked = false
        }
    } else {
        cnt--;

        if (cnt === 0) {
            isFilled.artist = false
        }
    }
}

function onPosition() {
    isFilled.position = true;
}

function onGenre() {
    isFilled.genre = true;
}
