// const googleApiKey = 'AIzaSyC-Ti5WWOQoj6hn38vegO5tGR1W0_4Djr0';  // Replace with your actual key
// const weatherApiKey = '6c5b7dcc61c77762f1a1c263f2fc1248';  // Replace with your actual key

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {
//     document.getElementById("location").innerText = "Geolocation is not supported.";
//   }
// }

// function showPosition(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;

//   console.log(`Coordinates: Lat = ${lat}, Lon = ${lon}`);

//   initMap(lat, lon);

//   // Reverse Geocoding for City, State, Country
//   // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${"AIzaSyC-Ti5WWOQoj6hn38vegO5tGR1W0_4Djr0"}`)
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     if (data.status === "OK" && data.results.length > 0) {
//   //       const addressComponents = data.results[0].address_components;
//   //       let city = "Unknown", state = "Unknown", country = "Unknown";

//   //       addressComponents.forEach(component => {
//   //         if (component.types.includes("locality")) city = component.long_name;
//   //         if (component.types.includes("administrative_area_level_1")) state = component.long_name;
//   //         if (component.types.includes("country")) country = component.long_name;
//   //       });

//   //       document.getElementById("location").innerText = `📍 Location: ${city}, ${state}, ${country}`;
//   //     } else {
//   //       document.getElementById("location").innerText = "📍 Location not found.";
//   //       console.error("Geocoding error:", data.status);
//   //     }
//   //   })
//   //   .catch(error => {
//   //     console.error("Error with geocoding:", error);
//   //   });
// fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
//   .then(response => response.json())
//   .then(data => {
//     console.log('Reverse Geocoding Data:', data); // <--- debug output

//     if (data && data.address) {
//       const address = data.address;
//       const city = address.city || address.town || address.village || "Unknown";
//       const state = address.state || "Unknown";
//       const country = address.country || "Unknown";

//       document.getElementById("location").innerText = `📍 Location: ${city}, ${state}, ${country}`;
//     } else {
//       document.getElementById("location").innerText = "📍 Location not found.";
//     }
//   })
//   .catch(error => {
//     console.error("Geocoding error:", error);
//     document.getElementById("location").innerText = "📍 Failed to get location.";
//   });



//   // Weather Info
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"6c5b7dcc61c77762f1a1c263f2fc1248"}&units=metric`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.main && data.weather) {
//         const temp = data.main.temp;
//         const desc = data.weather[0].description;
//         document.getElementById("weather").innerText = `🌤 Weather: ${temp}°C, ${desc}`;
//       } else {
//         document.getElementById("weather").innerText = "🌤 Weather data unavailable.";
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching weather:", error);
//       document.getElementById("weather").innerText = "🌤 Failed to load weather data.";
//     });
// }

// function showError(error) {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       alert("User denied the request for Geolocation.");
//       break;
//     case error.POSITION_UNAVAILABLE:
//       alert("Location information is unavailable.");
//       break;
//     case error.TIMEOUT:
//       alert("The request to get user location timed out.");
//       break;
//     default:
//       alert("An unknown error occurred.");
//       break;
//   }
// }

// function initMap(lat, lon) {
//   const mapOptions = {
//     zoom: 12,
//     center: { lat: lat, lng: lon },
//   };

//   const map = new google.maps.Map(document.getElementById("map"), mapOptions);

//   new google.maps.Marker({
//     position: { lat: lat, lng: lon },
//     map: map,
//     title: "You are here!",
//   });
// }

const googleApiKey = 'AIzaSyC-Ti5WWOQoj6hn38vegO5tGR1W0_4Djr0';  // Google Maps API key
const weatherApiKey = '6c5b7dcc61c77762f1a1c263f2fc1248';        // OpenWeatherMap API key

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("location").innerText = "Geolocation is not supported.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log(`Coordinates: Lat = ${lat}, Lon = ${lon}`);

  initMap(lat, lon); // Show map

  // Reverse Geocoding using OpenStreetMap
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(response => response.json())
    .then(data => {
      console.log('Reverse Geocoding Data:', data);

      if (data && data.address) {
        const address = data.address;
        const city = address.city || address.town || address.village || address.hamlet || "Unknown";
        const state = address.state || "Unknown";
        const country = address.country || "Unknown";

        document.getElementById("location").innerText = `📍 Location: ${city}, ${state}, ${country}`;
      } else {
        document.getElementById("location").innerText = "📍 Location not found.";
      }
    })
    .catch(error => {
      console.error("Geocoding error:", error);
      document.getElementById("location").innerText = "📍 Failed to get location.";
    });

  // Weather Info
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.main && data.weather) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        document.getElementById("weather").innerText = `🌤 Weather: ${temp}°C, ${desc}`;
      } else {
        document.getElementById("weather").innerText = "🌤 Weather data unavailable.";
      }
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      document.getElementById("weather").innerText = "🌤 Failed to load weather data.";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    default:
      alert("An unknown error occurred.");
      break;
  }
}

function initMap(lat, lon) {
  const mapOptions = {
    zoom: 12,
    center: { lat: lat, lng: lon },
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  new google.maps.Marker({
    position: { lat: lat, lng: lon },
    map: map,
    title: "You are here!",
  });
}
