const menuButton = document.getElementById('menu-button');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const roulette = document.getElementById('roulette');
const resultContainer = document.getElementById('result-container');
const resultMenu = document.getElementById('result-menu');
const youtubeLink = document.getElementById('youtube-link');

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
    // -50은 중앙 정렬을 위한 보정값 (컨테이너 높이 150px의 절반 - 아이템 높이 50px의 절반)
    roulette.style.top = `-${finalPosition - 50}px`;

    setTimeout(() => {
        const selectedMenu = menuItems[randomIndex];
        resultMenu.textContent = "🎉 " + selectedMenu.name + " 🎉";
        
        // 유튜브 링크 생성
        const query = encodeURIComponent(selectedMenu.name + " 레시피");
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

// 페이지 로드 시 테마만 설정
document.addEventListener('DOMContentLoaded', () => {
    // 저장된 테마 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
});

