const END_POINT = 'https://dapi.kakao.com/';
const ACCESS_KEY = '06d0368b07d62787258e805a017c4626';
const URL = '/v2/local/search/address.json';
const $btn = document.querySelector('.signup__searchBtn');
const $btn_next = document.querySelector(".result__btn-next");
const $btn_pre = document.querySelector(".result__btn-pre");
const $result = document.querySelector('.result');
const $input = document.querySelector('.signup__searchInput');
const $ul = document.querySelector('.result-list');

const request = async (url, options) => {
    try {
        const res = await fetch(`${END_POINT}${url}`, {
            headers: {
                'Authorization': `KakaoAK ${ACCESS_KEY}`,
            },
            ...options,
        })
        
        if (res.ok) {
            const result = await res.json()

            return result
        } else {
            throw new Error(`뭔가 잘못 되었습니다! status code: ${res.status}`)
        }

    } catch (e) {
        throw new Error(`서버 통신 중 에러 발생: ${e.message}`);
    }
}

const searchAddress = async (query, pageNum) => await request(`${URL}?query=${query}&page=${pageNum}`, { method: 'GET' });

const renderResult = (data) => {
    const { documents: results, meta: { pageable_count: pages } } = data;
    console.log(data);
    console.log(results, pages);

    $ul.innerHTML = "";
    let resultList = "";
    results.forEach(result => {
        const li = `<li>${result.address_name}  x:${result.x}  y:${result.y}</li>`;
        resultList += li;
    });
    $ul.innerHTML = resultList;
}

const init = () => {
    let pageIndex = 1;
    let isEnd = false;
    let query = "";

    $btn.addEventListener("click", async () => {
        pageIndex = 1;
        query = $input.value;

        const data = await searchAddress(query, pageIndex);
        isEnd = data.meta.is_end;
        renderResult(data);
        console.log(pageIndex);
    })

    $btn_next.addEventListener("click", async () => {
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

    $btn_pre.addEventListener("click", async () => {
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