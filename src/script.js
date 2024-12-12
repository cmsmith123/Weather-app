// =====================
// 1. Display Current Time
// =====================
let updateTime = () => {
  let date = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  let currentTime = date.toLocaleString("en-GB", options);

  document.getElementById("current-time").textContent = currentTime;
};

updateTime();
setInterval(updateTime, 60000);

// =====================
// 2. City Search and api
// =====================

function displayTemperature(response) {
  // Update the temperature
  let temperatureElement = document.querySelector(".main-temp-temp");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.textContent = temperature;

  // Update the city name
  let cityElement = document.querySelector("#city-name");
  cityElement.textContent = response.data.city;
}

// =====================
// 3. Handle City Search
// =====================
function search(event) {
  event.preventDefault();

  // Get the city input from the form
  let searchInputElement = document.querySelector("#city-input");
  let city = searchInputElement.value.trim();

  // Ensure a valid city is provided
  if (city === "") {
    alert("Please enter a valid city name.");
    return;
  }

  // Update the API URL
  let apiKey = "4tfaffbffaf48bc3487e51cca5e0o031"; // Replace with your API key
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Make the API call
  axios.get(apiUrl).then(displayTemperature);

  // Clear and refocus the input
  searchInputElement.value = "";
  searchInputElement.focus();
}

// =====================
// 4. Set Up Event Listener for Form
// =====================
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);
