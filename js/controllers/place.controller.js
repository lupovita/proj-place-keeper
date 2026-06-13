'use strict';

let gMap;
let gMarkers = [];

// TODO: Step 4 - Add a button to the map (Using google map documentation on how to do that). when user clicks the button, get his current location and center the map accordingly. Tip: Use the code shown in class (Modern HTML).

// TODO: Step 5 - Let the user download a CSV of the places

// TODO: Replace the prompt for new place name with a nice modal (Using dialog element)

downloadLibraries();

async function downloadLibraries() {
    await google.maps.importLibrary("maps");
    await google.maps.importLibrary("marker");
}

function onInit() {
    renderPlaces();
    renderSettings();
    gMap.addListener('click', onAddPlace);
}

function renderPlaces() {
    const places = getPlaces();
    let innerHTML = places.map(place => 
        `<li>
            <span class="place-name">${place.name}</span>
            <button class="btn rounded hover" title="Delete place"
                onclick="onRemovePlace('${place.id}')">X</button>
            <button class="btn rounded hover fas location" title="Go to place"
                onclick="onPanToPlace('${place.id}')"></button>
        </li>`
    ).join('');
    innerHTML = `<ul class="clean-list">
                    ${innerHTML}
                </ul>`;
    document.querySelector('.places-list').innerHTML = innerHTML;
    renderMarkers();
}

function renderSettings() {
    const user = getUser();
    // Render BgColor
    document.querySelector('.main-content').style.backgroundColor = user.bgColorWithOpacity;
    // Render txtColor
    if (user.txtColor !== getDefaultTxtColor()) {
        document.querySelector('.places-list>ul').style.color = user.txtColor;
    }
    // Init And Render Map
    initMap({ position: user.initLoc, zoom: user.initZoom });
}

function initMap({ position, zoom }) {
    const elMap = document.querySelector(".map");
    const options = { zoom, center: position, mapId: 'mapId' };
    gMap = new google.maps.Map(elMap, options);
}

function renderMarkers() {
    const places = getPlaces();
    // remove previous markers
    gMarkers.forEach(marker => marker.setMap(null));
    // every place is creating a marker
    gMarkers = places.map(place => new google.maps.marker.AdvancedMarkerElement(
        { position: place, map: gMap, title: place.name }));
}

function onRemovePlace(placeId) {
    removePlace(placeId);
    renderPlaces();
}

function onAddPlace(ev) {
    const name = prompt('Place name?', 'Place 1');
    const lat = ev.latLng.lat(), lng = ev.latLng.lng();
    addPlace(name, lat, lng, gMap.getZoom());
    renderPlaces()
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId);
    gMap.setCenter({ lat: place.lat, lng: place.lng });
    gMap.setZoom(place.zoom);
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}

// function featureDetection() {
//     if (!navigator.geolocation) {
//         alert("HTML5 Geolocation is not supported in your browser");
//         return;
//     }
// }
// 
// function getPosition() {
//     if (!navigator.geolocation) {
//         alert("HTML5 Geolocation is not supported in your browser")
//         return
//     }

//     // One time position snapshot or continues watch
//     navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
//     // navigator.geolocation.watchPosition(showLocation, handleLocationError)
// }

// function showLocation(position) {
//     document.getElementById("latitude").innerHTML = position.coords.latitude
//     document.getElementById("longitude").innerHTML = position.coords.longitude
//     document.getElementById("accuracy").innerHTML = position.coords.accuracy
//     const date = new Date(position.timestamp)
//     document.getElementById("timestamp").innerHTML = formatTime(date)
//     initMap(position.coords.latitude, position.coords.longitude)
// }

// function handleLocationError(err) {
//     var errMsg = ""
//     switch (err.code) {
//         case 1:
//             errMsg = "The user didn't allow this page to retrieve a location."
//             break
//         case 2:
//             errMsg = "Unable to determine your location: " + err.message
//             break
//         case 3:
//             errMsg = "Timed out before retrieving the location."
//             break
//     }
//     const elMsg = document.querySelector(".err-msg")
//     elMsg.innerHTML = errMsg
// }