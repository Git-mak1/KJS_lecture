const generateBtn = document.getElementById('generate-btn');
const numberDivs = document.querySelectorAll('.number');

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
    return Array.from(numbers);
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