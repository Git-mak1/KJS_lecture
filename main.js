// Teachable Machine URL
const URL = "https://teachablemachine.withgoogle.com/models/FdTNcgePs/";

let model, maxPredictions;
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const faceImage = document.getElementById('face-image');
const placeholder = document.getElementById('placeholder');
const themeBtn = document.getElementById('theme-btn');
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
    let theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', theme);
});

// Load Model
async function loadModel() {
    if (!model) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }
}

// Handle Button Click
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

// Handle File Selection
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Display Preview
    const reader = new FileReader();
    reader.onload = async (e) => {
        faceImage.src = e.target.result;
        faceImage.classList.remove('hidden');
        placeholder.classList.add('hidden');
        
        // Analyze
        await analyze();
    };
    reader.readAsDataURL(file);
});

async function analyze() {
    uploadBtn.disabled = true;
    uploadBtn.textContent = "분석 중...";

    try {
        await loadModel();
        
        // Ensure image is loaded before predicting
        if (!faceImage.complete) {
            await new Promise(resolve => faceImage.onload = resolve);
        }

        const prediction = await model.predict(faceImage);
        displayResults(prediction);
    } catch (error) {
        console.error("Analysis failed:", error);
        alert("분석에 실패했습니다.");
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = "다른 사진 업로드하기";
    }
}

function displayResults(prediction) {
    resultContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        const label = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);
        const emoji = label === "강아지" ? "🐶" : (label === "고양이" ? "🐱" : "✨");
        
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <span class="label">${label}상 ${emoji}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${probability}%; background-color: ${getBarColor(label, i)}"></div>
            </div>
            <span class="probability">${probability}%</span>
        `;
        resultContainer.appendChild(resultItem);
    }
    resultContainer.classList.remove('hidden');
}

function getBarColor(label, index) {
    if (label === "강아지") return "var(--dog-color)";
    if (label === "고양이") return "var(--cat-color)";
    const colors = ["#ffca28", "#42a5f5", "#66bb6a", "#ef5350", "#ab47bc"];
    return colors[index % colors.length];
}
