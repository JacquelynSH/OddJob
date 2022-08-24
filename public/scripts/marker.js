function initMap() {
  let map;
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("location"),
    {
      componentRestrictions: { country: ["ca"] },
      fields: ["address_components"],
      types: ["address"],
    }
  );
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log(place)

    // new google.maps.Marker({

    // })
  });
};

