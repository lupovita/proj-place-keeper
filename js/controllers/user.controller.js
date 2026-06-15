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
    elForm.querySelector('input[name="email"]').value = user.email;
    elForm.querySelector('input[name="age"]').value = user.age || MIN_AGE;
    elForm.querySelector('output[id="ageOutput"]').value = user.age || MIN_AGE;
    elForm.querySelector('input[name="bgColor"]').value = user.bgColor;
    elForm.querySelector('input[name="txtColor"]').value = user.txtColor;
    elForm.querySelector('input[name="birthDate"]').value = user.birthDate;
    elForm.querySelector('input[name="birthDate"]').min = formatDate(new Date(), MAX_AGE, 1);
    elForm.querySelector('input[name="birthDate"]').max = formatDate(new Date(), MIN_AGE, 1);
    elForm.querySelector('input[name="birthTime"]').value = user.birthTime;
    elForm.querySelector('input[name="gender"]').value = user.gender;
    elForm.querySelector('input[name="initZoom"]').value = user.initZoom;
    elForm.querySelector('input[name="initLat"]').value = user.initLoc.lat;
    elForm.querySelector('input[name="initLng"]').value = user.initLoc.lng;

    // Render BgColor
    document.querySelector('.main-content').style.backgroundColor = user.bgColorWithOpacity;

    // Render txtColor
    if (user.txtColor === getDefaultTxtColor()) return;
    document.querySelectorAll('.settings-form label').forEach(el => el.style.color = user.txtColor);
}

// Settings Form

// User CRUD

function onSaveUser() {
    const elForm = document.querySelector('.settings-form');
    const email = elForm.querySelector('input[name="email"]').value;
    const age = +elForm.querySelector('input[id="ageInput"]').value;
    const bgColor = elForm.querySelector('input[name="bgColor"]').value;
    const txtColor = elForm.querySelector('input[name="txtColor"]').value;
    const birthDate = elForm.querySelector('input[name="birthDate"]').value;
    const birthTime = elForm.querySelector('input[name="birthTime"]').value;
    const gender = elForm.querySelector('input[name="gender"]').value;
    const initZoom = +elForm.querySelector('input[name="initZoom"]').value;
    const initLat = +elForm.querySelector('input[name="initLat"]').value;
    const initLng = +elForm.querySelector('input[name="initLng"]').value;
    const initLoc = { lat: initLat, lng: initLng };

    updateUser({ email, age, bgColor, txtColor, birthDate, birthTime, gender, initZoom, initLoc });
}

function onRenderAgeByBirthDate() {
    const elForm = document.querySelector('.settings-form');
    const birthDateStr = elForm.querySelector('input[name="birthDate"]').value;
    const birthTimeStr = elForm.querySelector('input[name="birthTime"]').value;
    if (!birthDateStr) return;

    const age = getAgeByBirthDate(...birthDateStr.split('-'), ...birthTimeStr.split(':'));
    elForm.querySelector('input[id="ageInput"]').value = age;
    elForm.querySelector('output[id="ageOutput"]').value = age;
}

function onClearForm() {
    const elForm = document.querySelector('.settings-form');
    elForm.reset();
    const defaultBgColorWithoutOpacity = getDefaultBgColor().slice(0, -2);
    elForm.querySelector('input[name="bgColor"]').value = defaultBgColorWithoutOpacity;
    elForm.querySelector('input[name="txtColor"]').value = getDefaultTxtColor();
}

// Menu

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}