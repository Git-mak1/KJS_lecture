// Teachable Machine URL
const URL = "https://teachablemachine.withgoogle.com/models/FdTNcgePs/";

let model, webcam, maxPredictions;
const startBtn = document.getElementById('start-btn');
const themeBtn = document.getElementById('theme-btn');
const webcamContainer = document.getElementById('webcam-container');
const resultContainer = document.getElementById('result-container');

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

// Load the image model and setup the webcam
async function init() {
    startBtn.disabled = true;
    startBtn.textContent = "모델 로딩 중...";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true; 
        webcam = new tmImage.Webcam(300, 300, flip);
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        // UI Updates
        webcamContainer.innerHTML = ""; // Remove placeholder
        webcamContainer.appendChild(webcam.canvas);
        
        // Prepare dynamic results
        resultContainer.innerHTML = "";
        for (let i = 0; i < maxPredictions; i++) {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const label = model.getClassLabels()[i];
            const emoji = label === "강아지" ? "🐶" : (label === "고양이" ? "🐱" : "✨");
            
            resultItem.innerHTML = `
                <span class="label">${label}상 ${emoji}</span>
                <div class="progress-bar">
                    <div id="bar-${i}" class="progress" style="width: 0%; background-color: ${getBarColor(label, i)}"></div>
                </div>
                <span id="prob-${i}" class="probability">0%</span>
            `;
            resultContainer.appendChild(resultItem);
        }
        
        resultContainer.classList.remove('hidden');
        startBtn.style.display = "none";
    } catch (error) {
        console.error("Error initializing webcam or model:", error);
        alert("카메라 권한이 필요하거나 모델을 불러오는 데 실패했습니다.");
        startBtn.disabled = false;
        startBtn.textContent = "테스트 시작하기";
    }
}

function getBarColor(label, index) {
    if (label === "강아지") return "var(--dog-color)";
    if (label === "고양이") return "var(--cat-color)";
    const colors = ["#ffca28", "#42a5f5", "#66bb6a", "#ef5350", "#ab47bc"];
    return colors[index % colors.length];
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    
    for (let i = 0; i < maxPredictions; i++) {
        const probability = (prediction[i].probability * 100).toFixed(0);
        const bar = document.getElementById(`bar-${i}`);
        const probText = document.getElementById(`prob-${i}`);
        
        if (bar && probText) {
            bar.style.width = probability + "%";
            probText.textContent = probability + "%";
        }
    }
}

startBtn.addEventListener('click', init);
