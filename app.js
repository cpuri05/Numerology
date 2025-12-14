// --- 1. TRANSLATION DICTIONARY ---
const translations = {
    en: {
        app_title: "Numerology",
        tab_single: "Single Analysis",
        tab_compat: "Compatibility",
        lbl_category: "Category",
        lbl_value: "Enter Text",
        opt_name: "Name",
        opt_business: "Business Name",
        opt_vehicle: "Vehicle Number",
        opt_custom: "Other...",
        btn_calc: "Calculate Vibration",
        btn_compare: "Check Compatibility",
        lbl_person_a: "First Name/Entity",
        lbl_person_b: "Second Name/Entity",
        res_prefix: "The",
        res_vibration: "has a vibration of",
        rel_friend: "Friend",
        rel_neutral: "Neutral",
        rel_enemy: "Enemy",
        rel_desc: "are considered"
    },
    hi: {
        app_title: "अंकज्योतिष",
        tab_single: "एकल विश्लेषण",
        tab_compat: "मैत्री चक्र",
        lbl_category: "श्रेणी",
        lbl_value: "नाम दर्ज करें",
        opt_name: "नाम",
        opt_business: "व्यापार का नाम",
        opt_vehicle: "गाड़ी नंबर",
        opt_custom: "अन्य...",
        btn_calc: "अंक गणना करें",
        btn_compare: "मैत्री जांचें",
        lbl_person_a: "पहला नाम",
        lbl_person_b: "दूसरा नाम",
        res_prefix: "",
        res_vibration: "का मूलांक है",
        rel_friend: "मित्र",
        rel_neutral: "सम (Neutral)",
        rel_enemy: "शत्रु",
        rel_desc: "का संबंध है"
    }
};

let currentLang = 'en';
let engine;

// --- UI Elements ---
let langSwitch, categorySelect, categoryCustom, inputText, btnCalculate, resultArea, resultMsg, resultNum;
let inputA, inputB, btnCompare, compatResultArea, numADisp, numBDisp, nameADisp, nameBDisp, relationStatus, compatDesc;
let sectionSingle, sectionCompat, tabSingle, tabCompat;

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    engine = new NumerologyEngine();
    
    langSwitch = document.getElementById('lang-switch');
    sectionSingle = document.getElementById('section-single');
    sectionCompat = document.getElementById('section-compat');
    tabSingle = document.getElementById('tab-single');
    tabCompat = document.getElementById('tab-compat');
    categorySelect = document.getElementById('category-select');
    categoryCustom = document.getElementById('category-custom');
    inputText = document.getElementById('input-text');
    btnCalculate = document.getElementById('btn-calculate');
    resultArea = document.getElementById('result-area');
    resultMsg = document.getElementById('result-message');
    resultNum = document.getElementById('result-number');

    inputA = document.getElementById('compat-input-a');
    inputB = document.getElementById('compat-input-b');
    btnCompare = document.getElementById('btn-compare');
    compatResultArea = document.getElementById('compat-result-area');
    numADisp = document.getElementById('num-a-disp');
    numBDisp = document.getElementById('num-b-disp');
    nameADisp = document.getElementById('name-a-disp');
    nameBDisp = document.getElementById('name-b-disp');
    relationStatus = document.getElementById('relation-status');
    compatDesc = document.getElementById('compat-desc');

// --- LANGUAGE FUNCTION ---
function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Update simple text elements
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (t[key]) elem.textContent = t[key];
    });

    // Update select options
    categorySelect.options[0].textContent = t.opt_name;
    categorySelect.options[1].textContent = t.opt_business;
    categorySelect.options[2].textContent = t.opt_vehicle;
    categorySelect.options[3].textContent = t.opt_custom;

    // Update placeholders
    if(lang === 'hi') {
        inputText.placeholder = "जैसे: सूर्य एतर्प्राइज़";
        categoryCustom.placeholder = "श्रेणी का नाम लिखें";
        inputA.placeholder = "पहला नाम";
        inputB.placeholder = "दूसरा नाम";
    } else {
        inputText.placeholder = "e.g., Alice Enterprise";
        categoryCustom.placeholder = "Enter Category Name";
        inputA.placeholder = "A";
        inputB.placeholder = "B";
    }
}

    // Event Listener for Language Switch
    langSwitch.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Initialize language on load
    updateLanguage(currentLang);

    // --- EXISTING LOGIC ---

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

categorySelect.addEventListener('change', (e) => {
    if (e.target.value === 'Custom') {
        categoryCustom.classList.remove('hidden');
        categoryCustom.focus();
    } else {
        categoryCustom.classList.add('hidden');
    }
});

btnCalculate.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (!text) return alert(currentLang === 'hi' ? "कृपया कुछ लिखें" : "Please enter some text");

    // Logic to get display name of category
    let categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;
    if (categorySelect.value === 'Custom') {
        categoryLabel = categoryCustom.value || (currentLang === 'hi' ? "कस्टम" : "Custom");
    }

    const number = engine.calculate_vibration(text);
    const t = translations[currentLang];

    // Format output based on language
    if(currentLang === 'hi') {
        resultMsg.innerHTML = `${categoryLabel} <strong>"${text}"</strong> ${t.res_vibration}:`;
    } else {
        resultMsg.innerHTML = `${t.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${t.res_vibration}:`;
    }
    
    resultNum.textContent = number;
    resultArea.classList.remove('hidden');
});

btnCompare.addEventListener('click', () => {
    const textA = inputA.value.trim();
    const textB = inputB.value.trim();

    if (!textA || !textB) return alert(currentLang === 'hi' ? "कृपया दोनों नाम दर्ज करें" : "Please enter both names");

    const numA = engine.calculate_vibration(textA);
    const numB = engine.calculate_vibration(textB);
    const rawRel = engine.check_compatibility(numA, numB); // Returns Friend/Neutral/Enemy
    
    // Map internal English status to Display Language
    const t = translations[currentLang];
    let displayRel = rawRel;
    if (rawRel === 'Friend') displayRel = t.rel_friend;
    if (rawRel === 'Neutral') displayRel = t.rel_neutral;
    if (rawRel === 'Enemy') displayRel = t.rel_enemy;

    nameADisp.textContent = textA;
    numADisp.textContent = numA;
    nameBDisp.textContent = textB;
    numBDisp.textContent = numB;

    relationStatus.textContent = displayRel;
    relationStatus.className = `relation-badge status-${rawRel}`; // Keep English class for CSS colors

    if(currentLang === 'hi') {
         compatDesc.innerHTML = `${textA} (${numA}) और ${textB} (${numB}) के बीच <strong>${displayRel}</strong> ${t.rel_desc}।`;
    } else {
        compatDesc.innerHTML = `${textA} (${numA}) and ${textB} (${numB}) ${t.rel_desc} <strong>${displayRel}s</strong>.`;
    }
    
    compatResultArea.classList.remove('hidden');
    });
});