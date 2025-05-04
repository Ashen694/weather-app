// Get DOM Elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResultDiv = document.getElementById('weatherResult');
const errorMessageDiv = document.getElementById('errorMessage');
const cityNameH2 = document.getElementById('cityName');
const weatherIconImg = document.getElementById('weatherIcon');
const temperatureP = document.getElementById('temperature');
const descriptionP = document.getElementById('description');
const humidityP = document.getElementById('humidity');
const windP = document.getElementById('wind');

// --- IMPORTANT: Replace with your actual OpenWeatherMap API Key ---
const apiKey = '1e1deac7b7c4136684a6f6a1a50d86dc';
// ------------------------------------------------------------------

// --- Event Listeners ---
searchButton.addEventListener('click', fetchWeatherData);

// Allow pressing Enter key in the input field to trigger search
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if it were in a form
        fetchWeatherData();
    }
});


// --- Functions ---

async function fetchWeatherData() {
    const city = cityInput.value.trim(); // Get city name and remove extra spaces

    // Clear previous results and errors
    weatherResultDiv.classList.add('hidden');
    errorMessageDiv.classList.add('hidden');
    errorMessageDiv.textContent = ''; // Clear previous error message


    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    // Construct the API URL
    // Using 'units=metric' for Celsius and m/s
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show a simple loading indicator (optional)
    // You could replace the button text or show a spinner
    searchButton.textContent = 'Searching...';
    searchButton.disabled = true; // Disable button during search

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Handle common errors
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling.`);
            } else if (response.status === 401) {
                 throw new Error('Invalid API Key. Please check your key in script.js.');
            }
            else {
                throw new Error(`An error occurred: ${response.statusText} (Code: ${response.status})`);
            }
        }

        const data = await response.json(); // Parse the JSON response
        displayWeather(data); // Display the fetched data

    } catch (error) {
        console.error("Error fetching weather data:", error); // Log the detailed error for debugging
        displayError(error.message); // Show user-friendly error message
    } finally {
         // Reset button state whether success or error
         searchButton.textContent = 'Search';
         searchButton.disabled = false;
    }
}

function displayWeather(data) {
    // Check if essential data exists (basic validation)
     if (!data || !data.name || !data.main || !data.weather || !data.weather[0]) {
        console.error("Incomplete data received from API:", data);
        displayError('Could not retrieve complete weather information.');
        return;
    }

    // Extract data from the JSON response
    const city = data.name;
    const country = data.sys.country ? `, ${data.sys.country}` : ''; // Add country code if available
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; // In m/s because of units=metric

    // Construct the icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update the HTML elements with the data
    cityNameH2.textContent = `${city}${country}`;
    weatherIconImg.src = iconUrl;
    weatherIconImg.alt = description; // Set alt text for accessibility
    temperatureP.textContent = `${temperature.toFixed(1)}°C`; // Format temperature
    descriptionP.textContent = description;
    humidityP.textContent = `Humidity: ${humidity}%`;
    windP.textContent = `Wind Speed: ${windSpeed.toFixed(1)} m/s`;

    // Show the weather results and hide any previous error message
    weatherResultDiv.classList.remove('hidden');
    errorMessageDiv.classList.add('hidden');

     // Optional: Clear the input field after successful search
     // cityInput.value = '';
}

function displayError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden'); // Show the error message div
    weatherResultDiv.classList.add('hidden'); // Hide the results div
}