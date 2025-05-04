# Weather App ☁️☀️

A simple web application that displays the current weather conditions for a searched city using the OpenWeatherMap API. This project was built primarily with HTML, CSS, and vanilla JavaScript.

![Weather App Screenshot](img/weather-app-home.png)
![Weather App Screenshot](img/weather-app-result.png)

## Features

*   **City Search:** Enter a city name to get its current weather.
*   **Current Weather Data:** Displays:
    *   City Name (and country code)
    *   Temperature (in Celsius)
    *   Weather Description (e.g., "clear sky", "light rain")
    *   Weather Icon representing the current conditions
    *   Humidity Percentage
    *   Wind Speed (in meters/second)
*   **User Feedback:** Shows clear error messages for invalid city names or API issues.
*   **Responsive Design:** Basic structure adapts to different screen sizes (though CSS can be further improved).

## Technologies Used

*   **HTML5:** For the structure of the web page.
*   **CSS3:** For styling the user interface.
*   **JavaScript (ES6+):** For fetching data, handling user input, updating the DOM, and general application logic.
*   **OpenWeatherMap API:** Provides the real-time weather data.
*   **Fetch API:** Used within JavaScript to make requests to the OpenWeatherMap API.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ashen694/weather-app.git
    cd weather-app
    ```

2.  **Get an API Key:**
    *   You need an API key from [OpenWeatherMap](https://openweathermap.org/) to fetch weather data.
    *   Sign up for a free account on their website.
    *   Navigate to the "API keys" section in your account dashboard.
    *   Copy your generated API key.

3.  **Add API Key to the Code:**
    *   Open the `js/script.js` file.
    *   Find the line:
        ```javascript
        const apiKey = '1e1deac7b7c4136684a6f6a1a50d86dc';
        ```
    *   Replace `'1e1deac7b7c4136684a6f6a1a50d86dc'` with the actual API key you copied from OpenWeatherMap. **Important:** Keep your API key private, especially if you make this repository public. For learning projects, including it directly is okay, but for production apps, use environment variables or other secure methods.

4.  **Open the Application:**
    *   Simply open the `index.html` file in your web browser (e.g., by double-clicking it).
    *   Alternatively, if you use VS Code with the "Live Server" extension, you can right-click `index.html` and choose "Open with Live Server".

## How to Use

1.  Once the application is open in your browser, you'll see an input field and a search button.
2.  Type the name of the city you want to check the weather for (e.g., "Colombo", "Matara, LK", "London").
3.  Click the "Search" button or press the Enter key.
4.  The current weather information for the specified city will be displayed below the search box.
5.  If you enter an invalid city name or if there's an issue fetching data, an error message will appear.

