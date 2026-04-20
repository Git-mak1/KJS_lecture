const generateBtn = document.getElementById('generate-btn');
const themeBtn = document.getElementById('theme-btn');
const numberDivs = document.querySelectorAll('.number');

// Initialize Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn.textContent = '☀️ Light Mode';
}

// Theme Toggle Logic
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
    }
    localStorage.setItem('theme', theme);
});

// Lotto Logic
generateBtn.addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumber(div, number) {
    div.textContent = number;
    div.style.backgroundColor = getNumberColor(number);
}

function displayNumbers(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        displayNumber(numberDivs[i], numbers[i]);
    }
}

function getNumberColor(number) {
    if (number <= 10) {
        return '#fbc400'; // yellow
    } else if (number <= 20) {
        return '#69c8f2'; // blue
    } else if (number <= 30) {
        return '#ff7272'; // red
    } else if (number <= 40) {
        return '#aaa'; // gray
    } else {
        return '#b0d840'; // green
    }
}