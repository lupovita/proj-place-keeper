'use strict';

// Globals and Initialization

const USER_KEY = 'userDB';

function onInit() {
    renderHome();
}

// Rendering

function renderHome() {
    const user = loadFromStorage(USER_KEY);
    if (!user) return;
    // Render bgColor
    document.querySelector('.main-content').style.backgroundColor = user.bgColorWithOpacity;
    // Render txtColor
    document.querySelector('.main-teaser-text').style.color = user.txtColor;
}

// Menu

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}