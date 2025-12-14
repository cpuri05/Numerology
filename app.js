// Initialize the engine
const engine = new NumerologyEngine();

// UI Elements
const sectionSingle = document.getElementById('section-single');
const sectionCompat = document.getElementById('section-compat');
const tabSingle = document.getElementById('tab-single');
const tabCompat = document.getElementById('tab-compat');

// Inputs - Single
const categorySelect = document.getElementById('category-select');
const categoryCustom = document.getElementById('category-custom');
const inputText = document.getElementById('input-text');
const btnCalculate = document.getElementById('btn-calculate');
const resultArea = document.getElementById('result-area');
const resultMsg = document.getElementById('result-message');
const resultNum = document.getElementById('result-number');

// Inputs - Compat
const inputA = document.getElementById('compat-input-a');
const inputB = document.getElementById('compat-input-b');
const btnCompare = document.getElementById('btn-compare');
const compatResultArea = document.getElementById('compat-result-area');
const numADisp = document.getElementById('num-a-disp');
const numBDisp = document.getElementById('num-b-disp');
const nameADisp = document.getElementById('name-a-disp');
const nameBDisp = document.getElementById('name-b-disp');
const relationStatus = document.getElementById('relation-status');
const compatDesc = document.getElementById('compat-desc');

// Tab Switching Logic
tabSingle.addEventListener('click', () => {
    sectionSingle.classList.remove('hidden');
    sectionCompat.classList.add('hidden');
    tabSingle.classList.add('active');
    tabCompat.classList.remove('active');
});

tabCompat.addEventListener('click', () => {
    sectionSingle.classList.add('hidden');
    sectionCompat.classList.remove('hidden');
    tabSingle.classList.remove('active');
    tabCompat.classList.add('active');
});

// Handle Custom Category Toggle
categorySelect.addEventListener('change', (e) => {
    if (e.target.value === 'Custom') {
        categoryCustom.classList.remove('hidden');
        categoryCustom.focus();
    } else {
        categoryCustom.classList.add('hidden');
    }
});

// Calculate Single Vibration
btnCalculate.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (!text) return alert("Please enter some text.");

    // Determine Category Name
    let category = categorySelect.value;
    if (category === 'Custom') {
        category = categoryCustom.value || "Custom Input";
    }

    const number = engine.calculate_vibration(text);

    resultMsg.innerHTML = `The <strong>${category}</strong> "${text}" has a vibration of:`;
    resultNum.textContent = number;
    resultArea.classList.remove('hidden');
});

// Calculate Compatibility
btnCompare.addEventListener('click', () => {
    const textA = inputA.value.trim();
    const textB = inputB.value.trim();

    if (!textA || !textB) return alert("Please enter both names.");

    const numA = engine.calculate_vibration(textA);
    const numB = engine.calculate_vibration(textB);
    const relationship = engine.check_compatibility(numA, numB);

    nameADisp.textContent = textA;
    numADisp.textContent = numA;
    
    nameBDisp.textContent = textB;
    numBDisp.textContent = numB;

    relationStatus.textContent = relationship;
    relationStatus.className = `relation-badge status-${relationship}`;

    compatDesc.innerHTML = `${textA} (${numA}) and ${textB} (${numB}) are considered <strong>${relationship}s</strong>.`;
    
    compatResultArea.classList.remove('hidden');
});