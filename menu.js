const menuItems = [
    { name: "김치찌개", description: "한국인의 소울푸드, 얼큰하고 개운한 맛" },
    { name: "된장찌개", description: "구수한 맛이 일품인 전통 찌개" },
    { name: "부대찌개", description: "햄과 소시지가 듬뿍 들어간 퓨전 찌개" },
    { name: "순두부찌개", description: "부드러운 순두부와 매콤한 국물의 조화" },
    { name: "비빔밥", description: "다양한 나물과 고추장을 비벼 먹는 건강식" },
    { name: "불고기", description: "달콤한 간장 양념에 재운 소고기 요리" },
    { name: "갈비찜", description: "부드러운 갈비와 달콤짭짤한 양념의 조화" },
    { name: "제육볶음", description: "매콤한 양념에 볶은 돼지고기 요리" },
    { name: "삼겹살", description: "한국인이 가장 사랑하는 돼지고기 구이" },
    { name: "닭갈비", description: "매콤한 양념에 볶은 닭고기와 채소" },
    { name: "찜닭", description: "간장 양념에 졸인 닭고기와 당면" },
    { name: "삼계탕", description: "인삼과 대추를 넣고 푹 고아낸 영양 만점 닭요리" },
    { name: "떡볶이", description: "매콤달콤한 소스에 끓인 떡과 어묵" },
    { name: "김밥", description: "다양한 재료를 넣고 김으로 만 밥" },
    { name: "짜장면", description: "춘장에 볶은 고기와 채소를 얹은 중식 면요리" },
    { name: "짬뽕", description: "얼큰한 국물과 해물이 가득한 중식 면요리" },
    { name: "탕수육", description: "바삭하게 튀긴 고기에 달콤한 소스를 곁들인 요리" },
    { name: "초밥", description: "신선한 해산물을 얹은 일본식 밥 요리" },
    { name: "돈까스", description: "바삭하게 튀긴 돼지고기 커틀릿" },
    { name: "라멘", description: "진한 국물과 쫄깃한 면발의 일본식 라면" },
    { name: "파스타", description: "다양한 소스와 함께 즐기는 이탈리아 면요리" },
    { name: "피자", description: "토핑을 얹어 구운 이탈리아식 플랫브레드" },
    { name: "스테이크", description: "두툼하게 구운 소고기" },
    { name: "햄버거", description: "빵 사이에 패티와 채소를 넣은 음식" },
    { name: "쌀국수", description: "진한 국물과 부드러운 면발의 베트남 요리" },
    { name: "마라탕", description: "얼얼하고 매운 맛이 특징인 중국식 탕요리" },
    { name: "양꼬치", description: "향신료를 뿌려 구운 양고기 꼬치" }
];

function populateRoulette() {
    const roulette = document.getElementById('roulette');
    if (!roulette) return;

    roulette.innerHTML = '';
    // To make it look like it's scrolling infinitely, we repeat the list 5 times.
    const repeatedItems = [...menuItems, ...menuItems, ...menuItems, ...menuItems, ...menuItems]; 
    
    repeatedItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('roulette-item');
        div.textContent = item.name;
        roulette.appendChild(div);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Populate the menu grid for menu list page
    const menuGrid = document.querySelector('.menu-grid');
    if (menuGrid) {
        const isIndexPage = document.querySelector('body.index-page');
        const itemsToDisplay = isIndexPage ? menuItems.slice(0, 8) : menuItems;

        itemsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('menu-card');
            
            const name = document.createElement('h3');
            name.textContent = item.name;
            
            const description = document.createElement('p');
            description.textContent = item.description;
            
            card.appendChild(name);
            card.appendChild(description);
            menuGrid.appendChild(card);
        });
    }

    // Populate the roulette for the main page
    populateRoulette();
});
