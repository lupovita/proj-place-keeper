'use strict';

// Globals and initialization

const MIN_AGE = 18, MAX_AGE = 120;

function onInit() {
    renderUser();
}

// Rendering

function renderUser() {
    const user = getUser();
    const elForm = document.querySelector('.settings-form');

    // Render Form
    elForm.email.value = user.email;
    elForm.ageInput.value = user.age || MIN_AGE;
    elForm.ageOutput.value = user.age || MIN_AGE;
    elForm.bgColor.value = user.bgColor;
    elForm.txtColor.value = user.txtColor;
    elForm.birthDate.value = user.birthDate;
    elForm.birthDate.min = formatDate(new Date(), MAX_AGE, 1);
    elForm.birthDate.max = formatDate(new Date(), MIN_AGE, 1);
    elForm.birthTime.value = user.birthTime;
    elForm.gender.value = user.gender;
    elForm.initZoom.value = user.initZoom;
    elForm.initLat.value = user.initLoc.lat;
    elForm.initLng.value = user.initLoc.lng;

    // Render BgColor
    document.querySelector('.main-content').style.backgroundColor = user.bgColorWithOpacity;

    // Render txtColor
    if (user.txtColor === getDefaultTxtColor()) return;
    document.querySelectorAll('.settings-form label').forEach(el => el.style.color = user.txtColor);
}

// Settings Form

// User CRUD

function onSaveUser(elForm) {
    // const elForm = ev.target; <- Another Option to capture elForm
    const user = {
        email: elForm.email.value,
        age: +elForm.ageInput.value,
        bgColor: elForm.bgColor.value,
        txtColor: elForm.txtColor.value,
        birthDate: elForm.birthDate.value,
        birthTime: elForm.birthTime.value,
        gender: elForm.gender.value,
        initZoom: +elForm.initZoom.value,
        initLoc: { lat: +elForm.initLat.value, lng: +elForm.initLng.value },
    }
    updateUser(user);
}

function onRenderAgeByBirthDate() {
    const elForm = document.querySelector('.settings-form');
    const birthDateStr = elForm.birthDate.value;
    const birthTimeStr = elForm.birthTime.value;
    if (!birthDateStr) return;

    const age = getAgeByBirthDate(...birthDateStr.split('-'), ...birthTimeStr.split(':'));
    elForm.ageInput.value = age;
    elForm.ageOutput.value = age;
}

function onClearForm() {
    const elForm = document.querySelector('.settings-form');
    elForm.reset();
    const defaultBgColorWithoutOpacity = getDefaultBgColor().slice(0, -2);
    elForm.bgColor.value = defaultBgColorWithoutOpacity;
    elForm.txtColor.value = getDefaultTxtColor();
}

// Menu

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}