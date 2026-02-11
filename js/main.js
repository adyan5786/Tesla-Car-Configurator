const topBar = document.querySelector('#top-bar');
const exteriorColourSection = document.querySelector('#exterior-buttons');
const interiorColourSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');
const totalPriceElement = document.querySelector('#total-price');
const fullSelfDrivingCheckbox = document.querySelector('#full-self-driving-checkbox');
const accessoryCheckboxes = document.querySelectorAll('.accessory-form-checkbox');
const downPaymentElement = document.querySelector('#down-payment');
const monthlyPaymentElement = document.querySelector('#monthly-payment');

const basePrice = 52490;
let currentPrice = basePrice;

let selectedColour = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

const pricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8500,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 225,
    },
};

// Update total price in the UI
const updateTotalPrice = () => {
    // Reset the current price to the base price
    currentPrice = basePrice;

    // Performance Wheel Option
    if (selectedOptions['Performance Wheels']) {
        currentPrice += pricing['Performance Wheels'];
    }

    // Performance Package Option
    if (selectedOptions['Performance Package']) {
        currentPrice += pricing['Performance Package'];
    }

    // Full Self-Driving Option
    if (selectedOptions['Full Self-Driving']) {
        currentPrice += pricing['Full Self-Driving'];
    }

    // Accessory Checkboxes
    accessoryCheckboxes.forEach((checkbox) => {
        // Extract the accessory label
        const accessoryLabel = checkbox.closest('label').querySelector('span').textContent.trim();

        const accessoryPrice = pricing['Accessories'][accessoryLabel];

        // Add to current price if accessory is selected
        if (checkbox.checked) {
            currentPrice += accessoryPrice;
        }
    });

    // Update the total price in the UI
    totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;

    updatePaymentBreakdown();
};

// Update payment breakdown based on current price
const updatePaymentBreakdown = () => {
    // Calculate the down payment
    const downPayment = currentPrice * 0.1;
    downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

    // Calculate loan details (assuming 60-month loan and 3% interest rate)
    const loanTermMonths = 60;
    const interestRate = 0.03;

    const loanAmount = currentPrice - downPayment;

    // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyInterestRate = interestRate / 12;

    const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;
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

        updateTotalPrice();
    }
};

// Performance Package Selection
const handlePerformanceButtonClick = () => {
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');

    // Update selected options
    selectedOptions['Performance Package'] = isSelected;

    updateTotalPrice();
}

// Full Self Driving Selection
const fullSelfDrivingChange = () => {
    selectedOptions['Full Self-Driving'] = fullSelfDrivingCheckbox.checked;

    updateTotalPrice();
};

// Handle Accessory Checkbox Listeners
accessoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateTotalPrice());
});

// Initial Update Total Price
updateTotalPrice();

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColourSection.addEventListener('click', handleColourButtonClick);
interiorColourSection.addEventListener('click', handleColourButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange)

// Prevent image dragging
document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") e.preventDefault();
});