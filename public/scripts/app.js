function initMap() {
  let map;

  //default location for map
  let location = {
    lat: -34.397,
    lng: 150.644,
  };
  let options = {
    center: location,
    zoom: 7,
  };
// location prompt for user
  if (navigator.geolocation) {
    console.log("Geolocation is here!");
    navigator.geolocation.getCurrentPosition(
      (loc) => {
        location.lat = loc.coords.latitude;
        location.lng = loc.coords.longitude;
        console.log("USER LOCATION:", location.lat, location.lng);

        map = new google.maps.Map(document.getElementById("map"), options);
      },
      (err) => {
        console.log("User declined locaiton tracking");
        map = new google.maps.Map(document.getElementById("map"), options);
      }
    );
  } else {
    console.log("No geolocation :(");
    map = new google.maps.Map(document.getElementById("map"), options);
  }

  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("search-input"),
    {
      componentRestrictions: { country: ["ca"] },
      fields: ["geometry"],
      types: [],
    }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const center = new google.maps.LatLng(lat, lng);
    map.panTo(center);

// adds a pin to the map based on above info
  function addPin (coords) {
    const marker = new google.maps.Marker({
      position: coords,
      title: place.name,
      map: map,
    })
// message for info window
    const infoWindow = new google.maps.InfoWindow({
      content: '<h1>"You are here"</h1>',
    });
// click listener to make the window pop up
    marker.addListener('click', () => {
      infoWindow.open({map, anchor: marker, shouldFocus: false,});
    });
  };

  addPin(center);

  });
};

window.initMap = initMap;


