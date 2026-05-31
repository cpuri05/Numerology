// --- 1. TRANSLATION DICTIONARY UPDATE ---
// (Paste this into the top of app.js)
const translations = {
    en: {
        app_title: "Numerology",
        tab_single: "Number Analysis",
        tab_compat: "Compatibility",
        tab_forecast: "Forecast",
        tab_profiles: "Saved Profiles",
        lbl_dob: "Date of Birth",
        lbl_target_date: "Forecast Date",
        lbl_category: "Category",
        lbl_value: "Enter Name/Text",
        opt_name: "Name",
        opt_business: "Business Name",
        opt_vehicle: "Vehicle Number",
        opt_custom: "Other...",
        btn_calc: "Analyze",
        btn_compare: "Check Compatibility",
        btn_forecast: "Get Horoscope",
        btn_save: "💾 Save Profile",
        btn_clear_all: "🗑️ Clear All Profiles",
        lbl_person_a: "First Name/Entity",
        lbl_person_b: "Second Name/Entity",
        res_prefix: "The",
        res_vibration: "vibration is",
        res_basic_lbl: "Basic Number (Moolank)",
        res_lucky_lbl: "Lucky Numbers",
        rel_friend: "Friend",
        rel_neutral: "Neutral",
        rel_enemy: "Enemy",
        rel_desc: "are considered",
        msg_enter_all: "Please enter Date of Birth and Text.",
        suit_exc: "Excellent Match! (Lucky Number)",
        suit_good: "Good Match (Friendly)",
        suit_neut: "Neutral Match",
        suit_avoid: "Avoid / Challenging (Enemy)",
        fc_year: "Yearly Influence (Varshank)",
        fc_month: "Monthly Influence (Masank)",
        fc_day: "Daily Influence (Dinank)",
        fc_favorable: "Favorable",
        fc_normal: "Normal",
        fc_unfavorable: "Unfavorable/Caution",
        fc_ruler: "Ruler",
        // Profile Management
        total_profiles: "Total Profiles",
        no_profiles: "No saved profiles yet",
        no_profiles_hint: "Analyze a name and save it to see it here",
        search_placeholder: "Search profiles...",
        modal_title: "Save Profile",
        modal_name: "Profile Name",
        modal_cancel: "Cancel",
        modal_save: "Save",
        profile_saved: "Profile saved successfully!",
        profile_deleted: "Profile deleted",
        confirm_delete: "Delete this profile?",
        confirm_clear_all: "Delete ALL profiles? This cannot be undone.",
        profile_dob: "DOB",
        profile_category: "Category",
        profile_vibration: "Vibration",
        profile_status: "Status",
        btn_load: "Load",
        btn_delete: "Delete"
    },
    hi: {
        app_title: "अंकज्योतिष",
        tab_single: "अंक विश्लेषण",
        tab_compat: "मैत्री चक्र",
        tab_forecast: "वर्षफल",
        tab_profiles: "सहेजे प्रोफाइल",
        lbl_dob: "जन्म तिथि",
        lbl_target_date: "भविष्यफल तिथि",
        lbl_category: "श्रेणी",
        lbl_value: "नाम दर्ज करें",
        opt_name: "नाम",
        opt_business: "व्यापार का नाम",
        opt_vehicle: "गाड़ी नंबर",
        opt_custom: "अन्य...",
        btn_calc: "विश्लेषण करें",
        btn_compare: "मैत्री जांचें",
        btn_forecast: "भविष्यफल देखें",
        btn_save: "💾 प्रोफाइल सहेजें",
        btn_clear_all: "🗑️ सभी प्रोफाइल हटाएं",
        lbl_person_a: "पहला नाम",
        lbl_person_b: "दूसरा नाम",
        res_prefix: "",
        res_vibration: "का मूलांक है",
        res_basic_lbl: "मूलांक (Basic Number)",
        res_lucky_lbl: "भाग्यशाली अंक",
        rel_friend: "मित्र",
        rel_neutral: "सम (Neutral)",
        rel_enemy: "शत्रु",
        rel_desc: "का संबंध है",
        msg_enter_all: "कृपया जन्म तिथि और नाम दोनों दर्ज करें।",
        suit_exc: "सर्वोत्तम! (भाग्यशाली अंक)",
        suit_good: "शुभ (मित्र अंक)",
        suit_neut: "सम (साधारण)",
        suit_avoid: "अशुभ / शत्रु (बचें)",
        fc_year: "वर्षफल (वरशंक)",
        fc_month: "मासफल (मासंक)",
        fc_day: "दैनिक फल (दिनांक)",
        fc_favorable: "शुभ (Favorable)",
        fc_normal: "सम (Normal)",
        fc_unfavorable: "अशुभ (Unfavorable)",
        fc_ruler: "स्वामी",
        // Profile Management
        total_profiles: "कुल प्रोफाइल",
        no_profiles: "अभी तक कोई प्रोफाइल नहीं",
        no_profiles_hint: "नाम का विश्लेषण करें और यहां देखने के लिए सहेजें",
        search_placeholder: "प्रोफाइल खोजें...",
        modal_title: "प्रोफाइल सहेजें",
        modal_name: "प्रोफाइल का नाम",
        modal_cancel: "रद्द करें",
        modal_save: "सहेजें",
        profile_saved: "प्रोफाइल सहेजा गया!",
        profile_deleted: "प्रोफाइल हटाया गया",
        confirm_delete: "इस प्रोफाइल को हटाएं?",
        confirm_clear_all: "सभी प्रोफाइल हटाएं? यह पूर्ववत नहीं किया जा सकता।",
        profile_dob: "जन्म तिथि",
        profile_category: "श्रेणी",
        profile_vibration: "मूलांक",
        profile_status: "स्थिति",
        btn_load: "लोड करें",
        btn_delete: "हटाएं"
    }
};

let currentLang = 'en';
let engine;
let storage;
let lastAnalysisData = null;

// UI Elements
let langSwitch, categorySelect, categoryCustom, inputText, inputDob, btnCalculate;
let resultArea, resultMsg, resultNum, resBasicNum, resLuckyList, suitabilityBox;
let inputA, inputB, btnCompare, compatResultArea, numADisp, numBDisp, nameADisp, nameBDisp, relationStatus, compatDesc;
let sectionSingle, sectionCompat, sectionForecast, sectionProfiles;
let tabSingle, tabCompat, tabForecast, tabProfiles;
let btnSaveProfile, saveModal, modalProfileName, modalSave, modalCancel;
let profilesList, emptyState, profileCount, searchProfiles, btnClearAll;

// Forecast Elements
let inputDobFc, inputTargetDate, btnForecast, forecastResultArea;
let cardYear, cardMonth, cardDay;
let valYear, valMonth, valDay;
let statusYear, statusMonth, statusDay;

document.addEventListener('DOMContentLoaded', () => {
    engine = new NumerologyEngine();
    storage = new ProfileStorage();
    
    // Reference bindings
    langSwitch = document.getElementById('lang-switch');
    sectionSingle = document.getElementById('section-single');
    sectionCompat = document.getElementById('section-compat');
    sectionForecast = document.getElementById('section-forecast');
    sectionProfiles = document.getElementById('section-profiles');

    tabSingle = document.getElementById('tab-single');
    tabCompat = document.getElementById('tab-compat');
    tabForecast = document.getElementById('tab-forecast');
    tabProfiles = document.getElementById('tab-profiles');

    // Single Logic References
    categorySelect = document.getElementById('category-select');
    categoryCustom = document.getElementById('category-custom');
    inputText = document.getElementById('input-text');
    inputDob = document.getElementById('input-dob');
    btnCalculate = document.getElementById('btn-calculate');
    resultArea = document.getElementById('result-area');
    resultMsg = document.getElementById('result-message');
    resultNum = document.getElementById('result-number');
    resBasicNum = document.getElementById('res-basic-num');
    resLuckyList = document.getElementById('res-lucky-list');
    suitabilityBox = document.getElementById('suitability-box');

    // Compat Logic References
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

    // Forecast Logic References // NEW
    inputDobFc = document.getElementById('input-dob-fc');
    inputTargetDate = document.getElementById('input-target-date');
    btnForecast = document.getElementById('btn-forecast');
    forecastResultArea = document.getElementById('forecast-result-area');
    
    // Forecast Cards
    cardYear = document.getElementById('card-year');
    cardMonth = document.getElementById('card-month');
    cardDay = document.getElementById('card-day');

    // Profile Management References
    btnSaveProfile = document.getElementById('btn-save-profile');
    saveModal = document.getElementById('save-modal');
    modalProfileName = document.getElementById('modal-profile-name');
    modalSave = document.getElementById('modal-save');
    modalCancel = document.getElementById('modal-cancel');
    profilesList = document.getElementById('profiles-list');
    emptyState = document.getElementById('empty-state');
    profileCount = document.getElementById('profile-count');
    searchProfiles = document.getElementById('search-profiles');
    btnClearAll = document.getElementById('btn-clear-all');

    // Set Default Date to Today for Target
    inputTargetDate.valueAsDate = new Date();


    // --- LANGUAGE FUNCTION ---
    function updateLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (t[key]) elem.textContent = t[key];
        });

        // Update specific manual elements
        categorySelect.options[0].textContent = t.opt_name;
        categorySelect.options[1].textContent = t.opt_business;
        categorySelect.options[2].textContent = t.opt_vehicle;
        categorySelect.options[3].textContent = t.opt_custom;

        if(lang === 'hi') {
            inputText.placeholder = "जैसे: सूर्य एतर्प्राइज़";
            inputA.placeholder = "पहला नाम";
        } else {
            inputText.placeholder = "e.g., Alice Enterprise";
            inputA.placeholder = "A";
        }
    }

    langSwitch.addEventListener('change', (e) => updateLanguage(e.target.value));
    updateLanguage(currentLang);

    // --- TAB SWITCHING ---
    tabSingle.addEventListener('click', () => switchTab('single'));
    tabCompat.addEventListener('click', () => switchTab('compat'));
    tabForecast.addEventListener('click', () => switchTab('forecast'));
    tabProfiles.addEventListener('click', () => switchTab('profiles'));

    function switchTab(tabName) {
        sectionSingle.classList.add('hidden');
        sectionCompat.classList.add('hidden');
        sectionForecast.classList.add('hidden');
        sectionProfiles.classList.add('hidden');
        
        tabSingle.classList.remove('active');
        tabCompat.classList.remove('active');
        tabForecast.classList.remove('active');
        tabProfiles.classList.remove('active');

        if(tabName === 'single') {
            sectionSingle.classList.remove('hidden');
            tabSingle.classList.add('active');
        } else if(tabName === 'compat') {
            sectionCompat.classList.remove('hidden');
            tabCompat.classList.add('active');
        } else if(tabName === 'forecast') {
            sectionForecast.classList.remove('hidden');
            tabForecast.classList.add('active');
            // Auto-fill DOB if entered in single tab
            if(inputDob.value && !inputDobFc.value) {
                inputDobFc.value = inputDob.value;
            }
        } else if(tabName === 'profiles') {
            sectionProfiles.classList.remove('hidden');
            tabProfiles.classList.add('active');
            loadProfiles();
        }
    }

    // --- FORECAST LOGIC ---
    btnForecast.addEventListener('click', () => {
        const dob = inputDobFc.value;
        const target = inputTargetDate.value;
        const t = translations[currentLang];

        if(!dob || !target) return alert(currentLang === 'hi' ? "कृपया सभी तिथियां भरें" : "Please enter all dates");

        const dateObj = new Date(target);
        
        // 1. Calculate Jeevank (Parent)
        const jeevank = engine.get_jeevank(dob);
        
        // 2. Calculate Varshank (Year)
        const year = dateObj.getFullYear();
        const varshank = engine.get_varshank(jeevank, year);
        const relYear = engine.check_compatibility(jeevank, varshank); // Compare Year vs Life

        // 3. Calculate Masank (Month)
        const monthIndex = dateObj.getMonth() + 1;
        const masank = engine.get_masank(varshank, monthIndex);
        const relMonth = engine.check_compatibility(varshank, masank); // Compare Month vs Year

        // 4. Calculate Dinank (Day)
        const dayDate = dateObj.getDate();
        const weekdayVal = engine.get_weekday_value(dateObj);
        const dinank = engine.get_dinank(masank, dayDate, weekdayVal);
        const relDay = engine.check_compatibility(masank, dinank); // Compare Day vs Month

        // Update UI
        updateForecastCard('card-year', varshank, relYear, `${year}`, t);
        updateForecastCard('card-month', masank, relMonth, dateObj.toLocaleString(currentLang === 'hi' ? 'hi-IN' : 'en-US', { month: 'long' }), t);
        updateForecastCard('card-day', dinank, relDay, `${dateObj.getDate()} (${dateObj.toLocaleString(currentLang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short' })})`, t);

        forecastResultArea.classList.remove('hidden');
    });

    function updateForecastCard(cardId, number, relation, contextText, t) {
        const card = document.getElementById(cardId);
        const numEl = card.querySelector('.fc-number');
        const statusEl = card.querySelector('.fc-status');
        const ctxEl = card.querySelector('.fc-context');

        numEl.textContent = number;
        ctxEl.textContent = contextText;
        
        let statusText = "";
        let statusClass = "";

        if(relation === 'Friend') {
            statusText = t.fc_favorable;
            statusClass = 'status-Friend';
        } else if (relation === 'Enemy') {
            statusText = t.fc_unfavorable;
            statusClass = 'status-Enemy';
        } else {
            statusText = t.fc_normal;
            statusClass = 'status-Neutral';
        }

        statusEl.textContent = statusText;
        
        // Reset classes
        card.className = 'forecast-card'; 
        card.classList.add(statusClass + '-border'); // Add colored border
    }

    // ... (Existing Event Listeners for other tabs) ...
    // Note: Re-paste the Calculate and Compare listeners here if you are overwriting the whole file,
    // or just append the forecast logic if you are editing incrementally.
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
        const dob = inputDob.value;
        const t = translations[currentLang];

        if (!text || !dob) return alert(t.msg_enter_all);

        const nameVibration = engine.calculate_vibration(text);
        const dateMetrics = engine.calculate_date_metrics(dob);
        const luckyNumbers = engine.get_lucky_numbers(dateMetrics);
        const suitability = engine.analyze_name_suitability(nameVibration, dateMetrics.day_number, luckyNumbers);

        let categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;
        if (categorySelect.value === 'Custom') categoryLabel = categoryCustom.value || "Custom";
        
        // Store last analysis for saving
        lastAnalysisData = {
            name: text,
            dob: dob,
            category: categoryLabel,
            text: text,
            basicNumber: dateMetrics.day_number,
            luckyNumbers: luckyNumbers,
            vibration: nameVibration,
            suitability: suitability.status,
            suitabilityCode: suitability.code
        };

        resBasicNum.textContent = dateMetrics.day_number;
        resLuckyList.textContent = luckyNumbers.join(", ");

        if(currentLang === 'hi') {
            resultMsg.innerHTML = `${categoryLabel} <strong>"${text}"</strong> ${t.res_vibration}:`;
        } else {
            resultMsg.innerHTML = `${t.res_prefix} <strong>${categoryLabel}</strong> "${text}" ${t.res_vibration}:`;
        }
        resultNum.textContent = nameVibration;

        let suitText = "", suitClass = "";
        if (suitability.code === 'lucky_match') { suitText = t.suit_exc; suitClass = 'status-Friend'; }
        else if (suitability.code === 'friend') { suitText = t.suit_good; suitClass = 'status-Friend'; }
        else if (suitability.code === 'enemy')  { suitText = t.suit_avoid; suitClass = 'status-Enemy'; }
        else { suitText = t.suit_neut; suitClass = 'status-Neutral'; }

        suitabilityBox.textContent = suitText;
        suitabilityBox.className = `suitability-badge ${suitClass}`;
        resultArea.classList.remove('hidden');
    });

    btnCompare.addEventListener('click', () => {
        const textA = inputA.value.trim();
        const textB = inputB.value.trim();
        const t = translations[currentLang];

        if (!textA || !textB) return alert(currentLang === 'hi' ? "कृपया दोनों नाम दर्ज करें" : "Please enter both names");

        const numA = engine.calculate_vibration(textA);
        const numB = engine.calculate_vibration(textB);
        const rawRel = engine.check_compatibility(numA, numB);
        
        let displayRel = rawRel;
        if (rawRel === 'Friend') displayRel = t.rel_friend;
        if (rawRel === 'Neutral') displayRel = t.rel_neutral;
        if (rawRel === 'Enemy') displayRel = t.rel_enemy;

        nameADisp.textContent = textA;
        numADisp.textContent = numA;
        nameBDisp.textContent = textB;
        numBDisp.textContent = numB;
        relationStatus.textContent = displayRel;
        relationStatus.className = `relation-badge status-${rawRel}`;

        if(currentLang === 'hi') {
             compatDesc.innerHTML = `${textA} (${numA}) और ${textB} (${numB}) के बीच <strong>${displayRel}</strong> ${t.rel_desc}।`;
        } else {
            compatDesc.innerHTML = `${textA} (${numA}) and ${textB} (${numB}) ${t.rel_desc} <strong>${displayRel}s</strong>.`;
        }
        compatResultArea.classList.remove('hidden');
    });

    // --- PROFILE MANAGEMENT ---
    
    // Save Profile Button
    btnSaveProfile.addEventListener('click', () => {
        if (!lastAnalysisData) return;
        modalProfileName.value = lastAnalysisData.name;
        saveModal.classList.remove('hidden');
        modalProfileName.focus();
    });

    // Modal Save
    modalSave.addEventListener('click', () => {
        const profileName = modalProfileName.value.trim();
        if (!profileName) return alert(currentLang === 'hi' ? 'कृपया नाम दर्ज करें' : 'Please enter a name');
        
        const result = storage.saveProfile({
            ...lastAnalysisData,
            name: profileName
        });
        
        if (result.success) {
            saveModal.classList.add('hidden');
            const t = translations[currentLang];
            alert(t.profile_saved);
        } else {
            alert(result.error);
        }
    });

    // Modal Cancel
    modalCancel.addEventListener('click', () => {
        saveModal.classList.add('hidden');
    });

    // Close modal on background click
    saveModal.addEventListener('click', (e) => {
        if (e.target === saveModal) {
            saveModal.classList.add('hidden');
        }
    });

    // Load Profiles
    function loadProfiles(searchQuery = '') {
        const profiles = searchQuery ? storage.searchProfiles(searchQuery) : storage.getAllProfiles();
        const t = translations[currentLang];
        
        profileCount.textContent = storage.getCount();
        
        if (profiles.length === 0) {
            profilesList.innerHTML = '';
            emptyState.classList.remove('hidden');
            btnClearAll.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            btnClearAll.classList.remove('hidden');
            renderProfiles(profiles);
        }
    }

    // Render Profile Cards
    function renderProfiles(profiles) {
        const t = translations[currentLang];
        profilesList.innerHTML = profiles.map(profile => `
            <div class="profile-card" data-id="${profile.id}">
                <div class="profile-card-header">
                    <div>
                        <h3 class="profile-name">${profile.name}</h3>
                        <div class="profile-date">${new Date(profile.createdAt).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}</div>
                    </div>
                </div>
                <div class="profile-card-body">
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_dob}</span>
                        <span class="profile-info-value">${new Date(profile.dob).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US')}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_category}</span>
                        <span class="profile-info-value">${profile.category}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_vibration}</span>
                        <span class="profile-info-value">${profile.results.vibration}</span>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">${t.profile_status}</span>
                        <span class="profile-info-value">${profile.results.suitability}</span>
                    </div>
                </div>
                <div class="profile-card-footer">
                    <button class="profile-btn profile-btn-load" data-action="load" data-id="${profile.id}">${t.btn_load}</button>
                    <button class="profile-btn profile-btn-delete" data-action="delete" data-id="${profile.id}">${t.btn_delete}</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to buttons
        document.querySelectorAll('[data-action="load"]').forEach(btn => {
            btn.addEventListener('click', (e) => loadProfile(e.target.dataset.id));
        });
        
        document.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => deleteProfile(e.target.dataset.id));
        });
    }

    // Load Profile into Analyzer
    function loadProfile(id) {
        const profile = storage.getProfile(id);
        if (!profile) return;
        
        inputDob.value = profile.dob;
        inputText.value = profile.text;
        
        // Set category
        const categoryValue = profile.category;
        let found = false;
        for (let i = 0; i < categorySelect.options.length; i++) {
            if (categorySelect.options[i].text === categoryValue) {
                categorySelect.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            categorySelect.value = 'Custom';
            categoryCustom.value = categoryValue;
            categoryCustom.classList.remove('hidden');
        }
        
        switchTab('single');
    }

    // Delete Profile
    function deleteProfile(id) {
        const t = translations[currentLang];
        if (!confirm(t.confirm_delete)) return;
        
        const result = storage.deleteProfile(id);
        if (result.success) {
            loadProfiles(searchProfiles.value);
        }
    }

    // Search Profiles
    searchProfiles.addEventListener('input', (e) => {
        loadProfiles(e.target.value);
    });

    // Clear All Profiles
    btnClearAll.addEventListener('click', () => {
        const t = translations[currentLang];
        if (!confirm(t.confirm_clear_all)) return;
        
        const result = storage.clearAll();
        if (result.success) {
            loadProfiles();
        }
    });
});