const menuButton = document.getElementById('menu-button');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const roulette = document.getElementById('roulette');
const resultContainer = document.getElementById('result-container');
const resultMenu = document.getElementById('result-menu');
const youtubeLink = document.getElementById('youtube-link');

const menuItems = [
    "김치찌개", "된장찌개", "부대찌개", "순두부찌개", "비빔밥", "불고기", "갈비찜", "제육볶음", "삼겹살", "닭갈비",
    "찜닭", "삼계탕", "닭볶음탕", "떡볶이", "김밥", "순대", "튀김", "라면", "칼국수", "잔치국수",
    "비빔국수", "냉면", "콩국수", "쫄면", "우동", "짜장면", "짬뽕", "탕수육", "마파두부", "양장피",
    "유산슬", "깐풍기", "초밥", "돈까스", "가츠동", "규동", "라멘", "오코노미야키", "타코야키",
    "파스타", "피자", "스테이크", "리조또", "샐러드", "햄버거", "샌드위치", "토스트", "시리얼", "오므라이스",
    "카레", "하이라이스", "쌀국수", "월남쌈", "팟타이", "나시고랭", "타코", "부리또", "퀘사디아", "감자탕",
    "설렁탕", "곰탕", "육개장", "미역국", "북엇국", "콩나물국밥", "순대국밥", "돼지국밥", "소머리국밥", "갈비탕",
    "아구찜", "해물찜", "낙지볶음", "오징어볶음", "쭈꾸미볶음", "골뱅이무침", "도토리묵", "잡채", "계란말이", "계란찜",
    "생선구이", "회덮밥", "물회", "알탕", "동태찌개", "청국장", "비지찌개", "두부김치", "보쌈", "족발",
    "양꼬치", "마라탕", "마라샹궈", "샤브샤브", "스키야키", "밀푀유나베", "곱창구이", "대창구이", "막창구이", "닭발"
];

// 룰렛 리스트 채우기 (무한 스크롤처럼 보이게 여러번 복사)
function populateRoulette() {
    roulette.innerHTML = '';
    // 리스트를 5번 반복해서 길게 만듦
    const repeatedItems = [...menuItems, ...menuItems, ...menuItems, ...menuItems, ...menuItems]; 
    
    repeatedItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('roulette-item');
        div.textContent = item;
        roulette.appendChild(div);
    });
}

menuButton.addEventListener('click', () => {
    // 결과창 숨기기
    resultContainer.classList.add('hidden');
    menuButton.disabled = true;

    const itemHeight = 50; // CSS의 .roulette-item 높이와 같아야 함
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    
    // 3번째 반복 세트 쯤에 있는 항목을 목표로 설정 (충분히 돌아가게)
    // 리스트 전체 길이 * 3 + 랜덤 인덱스
    const finalPositionIndex = (menuItems.length * 3) + randomIndex;
    const finalPosition = finalPositionIndex * itemHeight;

    // 회전 시간 3초
    const spinDuration = 3000; 

    // 애니메이션 시작
    // cubic-bezier로 처음엔 빠르고 나중엔 천천히 멈추게 설정
    roulette.style.transition = `top ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    // 위치 이동 (위로 끌어올림)
    // -25는 중앙 정렬을 위한 보정값 (컨테이너 높이 절반 - 아이템 높이 절반)
    roulette.style.top = `-${finalPosition - 50}px`;

    setTimeout(() => {
        const selectedMenu = menuItems[randomIndex];
        resultMenu.textContent = "🎉 " + selectedMenu + " 🎉";
        
        // 유튜브 링크 생성
        const query = encodeURIComponent(selectedMenu + " 레시피");
        youtubeLink.href = `https://www.youtube.com/results?search_query=${query}`;
        
        resultContainer.classList.remove('hidden');
        menuButton.disabled = false;
        menuButton.innerText = "다시 고르기";

        // 다음 회전을 위해 위치 초기화 (눈속임)
        // 트랜지션을 끄고 순식간에 초기 위치(같은 메뉴가 있는 다른 반복 구간)로 이동
        setTimeout(() => {
            roulette.style.transition = 'none';
            // 1번째 반복 구간의 같은 메뉴 위치로 몰래 이동
            const resetIndex = menuItems.length + randomIndex;
            roulette.style.top = `-${(resetIndex * itemHeight) - 50}px`;
        }, 100);

    }, spinDuration);
});

// 다크모드 설정
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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    populateRoulette();
    
    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
});