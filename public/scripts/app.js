// Client facing scripts here

//create a new map
let map;

function initMap() {
  //default location
  let location = {
    lat: -34.397,
    lng: 150.644,
  };
  
  //default options
  let options = {
    center: location,
    zoom: 10,
  };

  //find if user will allow location tracking
  if (navigator.geolocation) {
    console.log("Geolocation is here!");
    navigator.geolocation.getCurrentPosition(
      //user location request ACCEPTED!
      (loc) => {
        //users location appending "location" from above
        location.lat = loc.coords.latitude;
        location.lng = loc.coords.longitude;
        console.log("USER LOCATION:", location.lat, location.lng);

        //draw to map with the target container and the options from above
        map = new google.maps.Map(document.getElementById("map"), options);
      },
      //user location request DENIED!
      (err) => {
        console.log("User declined locaiton tracking");

        //draw to map with the target container and the options from above
        map = new google.maps.Map(document.getElementById("map"), options);
      }
    );
  } else {
    console.log("No geolocation :(");
    map = new google.maps.Map(document.getElementById("map"), options);
  }

  //autocomplete for map search
  mapsearch = new google.maps.places.Autocomplete(
    document.getElementById("search-input"),
    {
      componentRestrictions: { country: ["ca"] },
      fields: ["geometry"],
      types: [],
    }
  );

  //event listener to repostion map on search bar coords
  mapsearch.addListener("place_changed", () => {
    const place = mapsearch.getPlace();
    
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log("LAT:", lat, "LNG:", lng);
    
    const center = {
      lat,
      lng
    }
    map.panTo(center);
  });
  
  //autocomplete for oddjob location
  joblocation = new google.maps.places.Autocomplete(
    document.getElementById("location"),
    {
      componentRestrictions: { country: ["ca"] },
        fields: ["geometry"],
        types: [],
      }
      );
      
  //event listener to console log oddjob location coords
  joblocation.addListener("place_changed", () => {
    const place = joblocation.getPlace();
    
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log("LAT:", lat, "LNG:", lng);
    
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lng;
  });
      
      // adds a pin to the map based on above info
      function addPin(coords) {
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
    addPin(center);
  };
  
  
  window.initMap = initMap;
  };