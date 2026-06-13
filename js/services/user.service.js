'use strict';

// Globals and initialization

const USER_KEY = 'userDB';
const BG_OPACITY = '4d';
const EILAT_LOC = { lat: 29.550360, lng: 34.952278 };
const INITIAL_ZOOM = 8;

let gUser;

_createUser();

// User Constructor

function _createUser() {
    gUser = loadFromStorage(USER_KEY);
    if (!gUser) {
        resetUser();
        _saveUser();
    }
}

// User Getters

function getUser() {
    return { ...gUser };
}

function getDefaultTxtColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-base');
}

function getDefaultBgColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-bg');
}

// User Storage

function _saveUser() {
    saveToStorage(USER_KEY, gUser);
}

// User CRUD

function resetUser() {
    const defaultTxtColor = getDefaultTxtColor();
    const defaultBgColor = getDefaultBgColor();
    gUser = {
        email: '',
        txtColor: defaultTxtColor,
        bgColor: defaultBgColor.slice(0, -2), // without opacity
        bgColorWithOpacity: defaultBgColor,
        age: '',
        birthDate: '',
        birthTime: '',
        gender: '',
        initZoom: INITIAL_ZOOM,
        initLoc: EILAT_LOC,
    };
    _saveUser();
}

function updateUser(user) {
    gUser = {
        ...user,
        bgColorWithOpacity: `${user.bgColor}${BG_OPACITY}`
    };
    _saveUser();
    return user;
}