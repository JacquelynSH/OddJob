function initMap() {
  let map;
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("location"),
    {
      componentRestrictions: { country: ["ca"] },
      fields: ["geometry","address_components"],
      types: ["address"],
    }
  );
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    // code pulled from app.js - still needs to be adjusted for proper use
  //   const lat = place.geometry.location.lat();
  //   const lng = place.geometry.location.lng();
  //   const jobLocation = new google.maps.LatLng(lat, lng);

  // function addPin (coords) {
  //   const marker = new google.maps.Marker({
  //     position: coords,
  //     map: map,
  //   })

  //   const infoWindow = new google.maps.InfoWindow({
  //     content: '<h1>"You clicked a place"</h1>',
  //   });

  //   marker.addListener('click', () => {
  //     infoWindow.open({map, anchor: marker, shouldFocus: false,});
  //   });

  // };

  // addPin(jobLocation);
  });
};
