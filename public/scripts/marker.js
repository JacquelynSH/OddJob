function initMap() {
  let map;
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("location"),
    {
      componentRestrictions: { country: ["ca"] },
      fields: [],
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

// document.onready?

// function initMap() {
// let autocomplete = new google.maps.places.Autocomplete(
//   document.querySelector("location"),
//   {
//     componentRestrictions: {country: ["ca"]},
//     fields: ["address_components", "geometry"],
//     types: ["address"],
//   }
// );

// autocomplete.addListener("place_changed", fillAddress);
// function fillAddress() {
//   const place = autocomplete.getPlace();
//   for (const component of place.address_components) {
//     const componentType = component.types[0];

//     switch (componentType) {
//       case "location":
//         document.querySelector("location").value = component.long_name;
//         break;
//     }

//   }
// }
// }
