'use strict';


function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function showElement(selector) {
    document.querySelector(selector).classList.remove('hide');
}

function hideElement(selector) {
    document.querySelector(selector).classList.add('hide');
}