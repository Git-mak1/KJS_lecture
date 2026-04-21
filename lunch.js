const menus = [
    { name: "제육볶음", image: "https://images.unsplash.com/photo-1664491048405-2562f79038e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "김치찌개", image: "https://images.unsplash.com/photo-1605298199927-4631a9b70446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "돈가스", image: "https://images.unsplash.com/photo-1593450553669-7977463f089b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "초밥", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "짜장면", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "햄버거", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "파스타", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "쌀국수", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1ccd63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "비빔밥", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "떡볶이", image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "냉면", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "샌드위치", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { name: "마라탕", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
];

const recommendBtn = document.getElementById('recommend-btn');
const menuName = document.getElementById('menu-name');
const menuImage = document.getElementById('menu-image');
const themeBtn = document.getElementById('theme-btn');

// Theme Logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
});

// Recommend Logic
recommendBtn.addEventListener('click', () => {
    recommendBtn.disabled = true;
    recommendBtn.textContent = "추천 중...";
    
    // Add simple animation effect
    let count = 0;
    const interval = setInterval(() => {
        const tempMenu = menus[Math.floor(Math.random() * menus.length)];
        menuName.textContent = tempMenu.name;
        count++;
        if (count > 10) {
            clearInterval(interval);
            const finalMenu = menus[Math.floor(Math.random() * menus.length)];
            menuName.textContent = finalMenu.name;
            menuImage.src = finalMenu.image;
            recommendBtn.disabled = false;
            recommendBtn.textContent = "다시 추천받기";
        }
    }, 100);
});

// Privacy Modal Logic
const privacyLink = document.getElementById('privacy-link');
const privacyModal = document.getElementById('privacy-modal');
const closeBtn = document.querySelector('.close-btn');

privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    privacyModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === privacyModal) {
        privacyModal.classList.add('hidden');
    }
});
