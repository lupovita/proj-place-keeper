'use strict';

// Globals and initialization

const MAP_ID = 'mapID';
const USER_KEY = 'userDB';
const INIT_LOC = { lat: 29.550360, lng: 34.952278 };
const INIT_ZOOM = 8;
const CURR_LOC_ZOOM = 15;

let gMap;
let gMarkers = [];
let gInfoWindow;
let gPlaceToAdd;

function onInit() {
    initMap();
    renderPlaces();
    renderUserSettings();
}

function initMap() {
    const user = loadFromStorage(USER_KEY);
    const zoom = user ? user.initZoom : INIT_ZOOM;
    const center = user ? user.initLoc : INIT_LOC;
    const elMap = document.querySelector('.map');
    const options = { center, zoom, mapId: MAP_ID };
    gMap = new google.maps.Map(elMap, options);
    gMap.addListener('click', onOpenAddPlaceModal);
    createLocationBtn();
}

function createLocationBtn() {
    gInfoWindow = new google.maps.InfoWindow();
    const locationBtn = document.createElement('button');

    locationBtn.classList.add('btn-location', 'fas', 'location');
    gMap.controls[google.maps.ControlPosition.INLINE_END_BLOCK_END].push(locationBtn);
    locationBtn.addEventListener('click', onPanToUserLocation);
}

// Rendering

function renderUserSettings() {
    const user = loadFromStorage(USER_KEY);
    if (!user) return;
    // Render BgColor
    document.querySelector('.main-content').style.backgroundColor = user.bgColorWithOpacity;
    // Render txtColor
    document.querySelectorAll('.places-list .place-name').forEach(
        el => el.style.color = user.txtColor);

}

function renderPlaces() {
    const places = getPlaces();
    let innerHTML = places.map(place =>
        `<li>
            <span class="place-name">${place.name}</span>
            <button class="btn rounded hover" title="Delete place"
                onclick="onRemovePlace('${place.id}')">X</button>
            <button class="btn rounded hover fas location-marker" title="Go to place"
                onclick="onPanToPlace('${place.id}')"></button>
        </li>`
    ).join('');

    document.querySelector('.places-list').innerHTML = innerHTML;

    // Needs to be rendered everytime places are rendered.
    renderMarkers();
}

function renderMarkers() {
    const places = getPlaces();
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null));
    // every place is creating a marker
    gMarkers = places.map(place =>
        new google.maps.marker.AdvancedMarkerElement({
            position: place,
            map: gMap,
            title: place.name
        }));
}

// Google Maps Section

function onPanToUserLocation() {
    // Check if HTML5 geolocation is supported.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showLocation,
            (err) => handleLocationError(true, err)
        );
    }
    else {
        // Browser doesn't support Geolocation.
        handleLocationError(false);
    }
}

function showLocation({ coords }) {
    const pos = { lat: coords.latitude, lng: coords.longitude };
    const content = `<div class="info-window">Your location.</div>`;
    gInfoWindow.setContent(content);
    gInfoWindow.setPosition(pos);
    gInfoWindow.open(gMap);
    gMap.setCenter(pos);
    gMap.setZoom(CURR_LOC_ZOOM);
}

function handleLocationError(browserHasGeolocation, err) {
    let errMsg;
    if (!browserHasGeolocation) {
        errMsg = 'Error: HTML5 Geolocation is not supported in your browser';
    }
    else {
        switch (err.code) {
            case PERMISSION_DENIED:
                errMsg = `Error: The page didn't get permission to retrieve your location.`;
                break;
            case POSITION_UNAVAILABLE:
                errMsg = 'Error: Unable to determine your location: ' + err.message;
                break;
            case TIMEOUT:
                errMsg = 'Error: Timed out before retrieving your location.';
                break;
        }
    }
    const content = `<div class="info-window">${errMsg}</div>`
    gInfoWindow.setContent(content);
    gInfoWindow.setPosition(gMap.getCenter());
    gInfoWindow.open(gMap);
}

// Place CRUD

function onRemovePlace(placeId) {
    if (!confirm('Are you sure ?')) return;
    removePlace(placeId);
    renderPlaces();
}

function onPanToPlace(placeId) {
    const { lat, lng, zoom } = getPlaceById(placeId);
    gMap.setCenter({ lat, lng });
    gMap.setZoom(zoom);
}

function onDownloadCSV(elLink) {
    elLink.href = 'data:text/csv;charset=utf-8,' + getPlacesCSVContent();
}

// Add Place Modal

function onOpenAddPlaceModal(ev) {
    gPlaceToAdd = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
        zoom: gMap.getZoom()
    };
    document.querySelector('.add-place-modal form').reset();
    document.querySelector('.add-place-modal').showModal();
}

function onCloseAddPlaceModal() {
    document.querySelector('.add-place-modal').close();
}

function onAddPlace(elForm) {
    gPlaceToAdd.name = elForm.placeName.value;
    addPlace(gPlaceToAdd);
    renderPlaces();
}

// Menu

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}