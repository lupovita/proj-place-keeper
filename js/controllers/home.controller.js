'use strict';

// Initialization

function onInit() {
    renderHome();
}

// Rendering

function renderHome() {
    const { txtColor, bgColorWithOpacity } = getUser();
    document.querySelector('.main-teaser-text').style.color = txtColor;
    document.querySelector('.main-content').style.backgroundColor = bgColorWithOpacity;
}

// Menu

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}