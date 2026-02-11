const topBar = document.querySelector('#top-bar');
const exteriorColourSection = document.querySelector('#exterior-buttons');
const interiorColourSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');

let selectedColour = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

// Handle Top Bar on Scrolls
const handleScroll = () => {
    const atTop = window.scrollY === 0;

    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

// Image Mapping
const exteriorImages = {
    'Stealth Grey': './images/model-y-stealth-grey.jpg',
    'Pearl White': './images/model-y-pearl-white.jpg',
    'Deep Blue Metallic': './images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './images/model-y-solid-black.jpg',
    'Ultra Red': './images/model-y-ultra-red.jpg',
    'Quicksilver': './images/model-y-quicksilver.jpg',
}

const interiorImages = {
    'Dark': './images/model-y-interior-dark.jpg',
    'Light': './images/model-y-interior-light.jpg',
}

// Handle Colour Selection
const handleColourButtonClick = (event) => {
    let button;

    if (event.target.tagName === "IMG") {
        button = event.target.closest('button');
    } else if (event.target.tagName === "BUTTON") {
        button = event.target;
    }

    if (button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((btn) => btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

        // Change exterior image
        if (event.currentTarget === exteriorColourSection) {
            selectedColour = button.querySelector('img').alt;
            updateExteriorImage();
        }

        // Change interior image
        if (event.currentTarget === interiorColourSection) {
            const colour = button.querySelector('img').alt;
            interiorImage.src = interiorImages[colour];
        }
    }
};

// Update exterior image based on colour and wheels
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colourKey = selectedColour in exteriorImages ? selectedColour : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colourKey].replace('.jpg', `${performanceSuffix}.jpg`);
};

// Wheel Selection
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700', 'text-white'));

        // Add selected styles to clicked button
        event.target.classList.add('bg-gray-700', 'text-white');

        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');
        updateExteriorImage();
    }
};

// Performance Package Selection
const handlePerformanceButtonClick = () => {
    performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');
}

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColourSection.addEventListener('click', handleColourButtonClick);
interiorColourSection.addEventListener('click', handleColourButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);