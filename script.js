const baseColorInput = document.getElementById('baseColorInput');
const brightnessSlider = document.getElementById('brightnessSlider');
const alphaSlider = document.getElementById('alphaSlider');
const colorBox = document.getElementById('colorBox');
const colorCodeOutput = document.getElementById('colorCodeOutput');
const colorNumberOutput = document.getElementById('colorNumberOutput')
const languageSelect = document.getElementById('languageSelect');
const titleElement = document.querySelector('h1');
const baseColorLabel = document.querySelector('label[for="baseColorInput"]');
const brightnessLabel = document.querySelector('label[for="brightnessSlider"]');
const alphaLabel = document.querySelector('label[for="alphaSlider"]');
const colorCodeLabel = document.querySelector('p > span#colorCodeOutput');
const colorNumberLabel = document.querySelector('p > span#colorNumberOutput');
const imageInput = document.getElementById('imageInput');
const imageDisplay = document.getElementById('imageDisplay');
const titleElement2 =document.querySelector('h2')
const uploadedImage = document.getElementById('uploadedImage');
const fileselection = document.getElementById('customfilelabel');
const playPauseButton = document.getElementById('playPauseButton');
const playmusic = document.getElementById('playmusic');
const title = document.getElementsByTagName('title');
let isRotating = true;

imageInput.addEventListener('change', handleImageUpload);
languageSelect.addEventListener('change', changeLanguage);

playmusic.play();

playPauseButton.addEventListener('click', () => {
    if (isRotating) {
        playPauseButton.style.animationPlayState = 'paused'; // 停止旋转动画
        playmusic.pause(); // 停止音乐播放
    } else {
        playPauseButton.style.animationPlayState = 'running'; // 开始旋转动画
        playmusic.play(); // 播放音乐
    }
    isRotating = !isRotating; // 切换旋转状态
});

function handleImageUpload(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
        const imageUrl = URL.createObjectURL(selectedImage);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;

        imageDisplay.innerHTML = ''; // 清空原有内容
    }
}

function changeLanguage() {//其中的语言文本
    const selectedLanguage = languageSelect.value;

    if (selectedLanguage === 'zh') {
        titleElement.textContent = '颜色调整器';
        baseColorLabel.textContent = '基础颜色：';
        brightnessLabel.textContent = '亮度：';
        alphaLabel.textContent = '透明度：';
        colorCodeLabel.textContent = '调整后颜色代码（RGBA）：';
        colorNumberLabel.textContent = '颜色编号：';
        titleElement2.textContent = '图片上传'
        fileselection.textContent = '选择文件'
        title.textContent = '颜色'
    } else {
        titleElement.textContent = 'Color Adjuster';
        baseColorLabel.textContent = 'Base Color:';
        brightnessLabel.textContent = 'Brightness:';
        alphaLabel.textContent = 'Alpha:';
        colorCodeLabel.textContent = 'Adjusted Color Code (RGBA):';
        colorNumberLabel.textContent = 'Color Number:';
        titleElement2.textContent = 'Image upload'
        fileselection.textContent = 'File Selection'
    }
}

// 初始加载时根据浏览器语言设置
const browserLanguage = navigator.language.substr(0, 2);
if (browserLanguage === 'zh') {
    languageSelect.value = 'zh';
} else {
    languageSelect.value = 'en';
}

changeLanguage(); // 更新初始页面文本

baseColorInput.addEventListener('input', updateColor);
brightnessSlider.addEventListener('input', updateColor);
alphaSlider.addEventListener('input', updateColor);

function updateColor() {
    const baseColor = baseColorInput.value;
    const adjustedColor = adjustColor(baseColor, Number(brightnessSlider.value), Number(alphaSlider.value));
    const colorNumber = calculateColorNumber(adjustedColor);

    colorBox.style.backgroundColor = adjustedColor;
    colorCodeOutput.textContent = adjustedColor;
    colorNumberOutput.textContent = `#${colorNumber.toString(16).padStart(6, '0')}`; 
}

function adjustColor(color, brightness, alpha) {//rgba的计算
    const hexToRgb = (hex) => hex.match(/\w\w/g).map((byte) => parseInt(byte, 16));

    const [r, g, b] = hexToRgb(color);
    const adjustedR = Math.max(0, Math.min(255, r + brightness));
    const adjustedG = Math.max(0, Math.min(255, g + brightness));
    const adjustedB = Math.max(0, Math.min(255, b + brightness));

    return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${alpha})`;
}

function calculateColorNumber(rgbaColor) {//色泽代码的计算
    const [r, g, b] = rgbaColor.match(/\d+/g).map(Number);
    return (r * 65536) + (g * 256) + b;
}

/*imageInput.addEventListener('change', function () {//图片输出限制旧
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        uploadedImage.src = reader.result;
        uploadedImage.style.maxWidth = '10px'; // 设置最大宽度
        uploadedImage.style.maxHeight = '10px'; // 设置最大高度
    }

    reader.readAsDataURL(file);
}); */


imageInput.addEventListener('change', function () {//图片缩放输出
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        uploadedImage.src = reader.result;
        imageDisplay.style.display = 'block'; // 显示图片容器
    }

    reader.readAsDataURL(file);
});