'use strict';

// Globals and initialization

const USER_KEY = 'userDB';
const BG_OPACITY = '4d';
const INIT_LOC = { lat: 29.550360, lng: 34.952278 };
const INIT_ZOOM = 8;

let gUser;

_createUser();

// User Constructor

function _createUser() {
    gUser = loadFromStorage(USER_KEY);
    if (!gUser) {
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
            initZoom: INIT_ZOOM,
            initLoc: INIT_LOC,
        };
        _saveUser();
    }
}

// User Getters

function getUser() {
    return { ...gUser };
}

function getDefaultTxtColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--clr-base');
}

function getDefaultBgColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--clr-bg');
}

// User Storage

function _saveUser() {
    saveToStorage(USER_KEY, gUser);
}

// User CRUD

function updateUser(user) {
    gUser = {
        ...user,
        bgColorWithOpacity: `${user.bgColor}${BG_OPACITY}`
    };
    _saveUser();
    return user;
}