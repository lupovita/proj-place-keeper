'use strict';

// Form Validations

function getAgeByBirthDate(...birthDateParams) {
    const birthDate = new Date(...birthDateParams);
    const nowDate = new Date();
    let age = new Date().getFullYear() - birthDate.getFullYear();

    if (nowDate.getMonth() + 1 < birthDate.getMonth()) age--;   // Months are 0-indexed
    else if (nowDate.getMonth() + 1 === birthDate.getMonth()) { // Months are 0-indexed
        if (nowDate.getDate() < birthDate.getDate()) age--;
        else if (nowDate.getDate() === birthDate.getDate()) {
            if (nowDate.getHours() < birthDate.getHours()) age--;
            else if (nowDate.getHours() === birthDate.getHours()) {
                if (nowDate.getMinutes() < birthDate.getMinutes()) age--;
            }
        }
    }
    return age;
}

function formatDate(date, yearsDiff = 0, daysDiff = 0) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year - yearsDiff}-${month}-${day - daysDiff}`;
}

// Storage

function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

// Random Generators

function getRandomId(idLength) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < idLength; i++) {
        id += chars.charAt(getRandomInt(0, chars.length));
    }
    return id;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}