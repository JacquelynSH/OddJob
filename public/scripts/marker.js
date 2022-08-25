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
    console.log(place)

  });
};

// let submitForm = document.querySelector("entire-oddjob-form");
// submitForm.addEventListener("submit", () => {
//   const pin = document.querySelector("location");
//   console.log(pin);
// });
