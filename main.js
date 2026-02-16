const menuButton = document.getElementById('menu-button');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const roulette = document.getElementById('roulette');
const resultContainer = document.getElementById('result-container');
const resultMenu = document.getElementById('result-menu');
const youtubeLink = document.getElementById('youtube-link');

const menuItems = [
    "된장찌개", "김치찌개", "순두부찌개", "육개장", "갈비탕",
    "감자탕", "고추장찌개", "곱창전골", "국밥", "부대찌개",
    "삼계탕", "해장국", "설렁탕", "해물찌개", "계란국",
    "미역국", "불고기", "닭갈비", "LA갈비", "제육볶음",
    "더덕구이", "김구이", "곱창구이", "삼겹살", "차돌박이",
    "오리고기", "떡갈비", "돼지불고기", "닭불고기", "라면",
    "칼국수", "잡채", "짜장면", "짬뽕", "중국냉면",
    "우동", "울면", "냉면", "김치라면", "콩국수",
    "잔치국수", "김밥", "비빔밥", "김치볶음밥", "회덮밥",
    "주먹밥", "콩밥", "콩나물밥", "누룽지", "돌솥비빔밥",
    "오징어볶음밥", "잡채밥", "볶음밥", "짜장밥", "짬뽕밥",
    "전", "호떡", "양념치킨", "김마리", "해물파전",
    "빈대떡", "깐풍새우", "라조기", "김치전", "고추전",
    "호박전", "동태전", "감자전", "떡볶이", "어묵",
    "소떡소떡", "계란빵", "팥빙수", "바나나우유", "산낙지",
    "연골", "핫바", "떡꼬치", "순대", "붕어빵",
    "호빵", "계란토스트", "김치", "오이샐러드", "피클",
    "쌈장", "천사채샐러드", "매운코울슬로", "콘치즈", "계란장",
    "시금치나물", "계란찜", "어묵볶음", "숙주나물", "도라지나물",
    "멸치볶음", "장조림", "깍두기", "오이소박이", "계란말이"
];

function populateRoulette() {
    roulette.innerHTML = '';
    const repeatedItems = [...menuItems, ...menuItems, ...menuItems, ...menuItems, ...menuItems]; // Repeat for a long list
    repeatedItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('roulette-item');
        div.textContent = item;
        roulette.appendChild(div);
    });
}

menuButton.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    menuButton.disabled = true;

    const totalItems = roulette.children.length;
    const itemHeight = 50;
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    
    // Position the final item somewhere in the latter part of the list for a better spin effect
    const finalPositionIndex = menuItems.length * 3 + randomIndex;
    const finalPosition = finalPositionIndex * itemHeight;

    const spinDuration = 4000; // 4 seconds

    roulette.style.transition = `top ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    roulette.style.top = `-${finalPosition}px`;

    setTimeout(() => {
        const selectedMenu = menuItems[randomIndex];
        resultMenu.textContent = selectedMenu;
        youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMenu + ' 레시피')}`;
        resultContainer.classList.remove('hidden');
        menuButton.disabled = false;
        
        // Reset roulette for the next spin without animation
        roulette.style.transition = 'none';
        const resetIndex = menuItems.length + randomIndex;
        roulette.style.top = `-${resetIndex * itemHeight}px`;

    }, spinDuration);
});

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleButton.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleButton.textContent = '🌙';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    populateRoulette();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
});