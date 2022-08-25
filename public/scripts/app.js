// Client facing scripts here
// let map;

//       function initMap() {
//         map = new google.maps.Map(document.getElementById("map"), {
//           center: { lat: -34.397, lng: 150.644 },
//           zoom: 8,
//         });
//       }

//       window.initMap = initMap;


// re jigged the code based on a youtube tutorials, same same but different lol

function initMap() {
  let map;
  let location = {
    lat: -34.397,
    lng: 150.644,
  };
  let options = {
    center: location,
    zoom: 7,
  };

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

  // adding auto complete to search bar

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
    // something here to re-focus the map to a new city

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const center = new google.maps.LatLng(lat, lng);
    console.log(map)
    map.panTo(center);
  });
};


