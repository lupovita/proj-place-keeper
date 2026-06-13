'use strict';

// Globals and initialization

const ID_LENGTH = 4;
const PLACES_KEY = 'placesDB';

let gPlaces;

_createPlaces();

// Place Constructors

function _createPlace(name, lat, lng, zoom) {
    return { id: getRandomId(ID_LENGTH), name, lat, lng, zoom };
}

function _createPlaces() {
    gPlaces = loadFromStorage(PLACES_KEY);
    if (!gPlaces || !gPlaces.length) {
        gPlaces = [
            _createPlace('Eilat', 29.550360, 34.952278, 8),
            _createPlace('Tel Aviv', 32.085300, 34.781769, 8),
            _createPlace('New York', 40.712776, -74.005974, 8),
            _createPlace('Montreal', 45.501690, -73.567253, 8),
            _createPlace('Ushuaia', -54.807563, -68.308481, 8),
        ];
        _savePlaces();
    }
}

// Place Getters

function getPlaces() {
    return gPlaces;
}

function getPlaceById(placeId) {
    return gPlaces.find(place => place.id === placeId);
}

// Place Storage

function _savePlaces() {
    saveToStorage(PLACES_KEY, gPlaces);
}

// Place CRUD

function removePlace(placeId) {
    const placeIdx = gPlaces.findIndex(place => place.id === placeId);
    let place = null;
    if (placeIdx !== -1) place = gPlaces.splice(placeIdx, 1)[0];
    _savePlaces();
    return place;
}

function addPlace(name, lat, lng, zoom) {
    const place = _createPlace(name, lat, lng, zoom);
    gPlaces.unshift(place);
    _savePlaces();
    return place;
}


