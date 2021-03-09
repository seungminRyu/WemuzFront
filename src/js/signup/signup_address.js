const END_POINT = 'https://dapi.kakao.com/';
const ACCESS_KEY = '06d0368b07d62787258e805a017c4626';
const URL = '/v2/local/search/address.json';
const $btn_search = document.querySelector('.signup__searchBtn');
const $btn_ad_next = document.querySelector(".result__btn-next");
const $btn_ad_pre = document.querySelector(".result__btn-pre");
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
    $ul.innerHTML = "";
    let resultList = "";

    results.forEach(result => {
        const li = `<li onclick="onAddress(event)">${result.address_name}</li>`;
        resultList += li;
    });
    $ul.innerHTML = resultList;
}

const onAddress = (e) => {
    const address =  e.target.innerText;
    $input.value = address;

    isFilled.address = true;
}