// Function to get weather data for a searched city
async function getWeather() {
    document.getElementById('loading').classList.remove('d-none');
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = ''; // Add your API key here
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        console.log('Fetching data for city:', city);
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
            throw new Error(`City not found or API request failed. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.location.name.toLowerCase() !== city.toLowerCase()) {
            alert("City not found. Please check the spelling and try again.");
            return;
        }

        console.log('Weather data received:', data);
        updateWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        alert(error.message);
    }

    document.getElementById('loading').classList.add('d-none');
}

// Function to update weather data for the searched city
function updateWeather(data) {
    const weather = data.current;
    document.getElementById('city-name').innerText = data.location.name;
    document.getElementById('temp_c_val').innerText = weather.temp_c;
    document.getElementById('temp_c').innerText = weather.temp_c;
    document.getElementById('temp_f').innerText = weather.temp_f;
    document.getElementById('condition').innerText = weather.condition.text;

    document.getElementById('humidity').innerText = weather.humidity;
    document.getElementById('humidity_val').innerText = weather.humidity;
    document.getElementById('feelslike_c').innerText = weather.feelslike_c;
    document.getElementById('feelslike_f').innerText = weather.feelslike_f;

    document.getElementById('wind_kph').innerText = weather.wind_kph;
    document.getElementById('wind_kph_val').innerText = weather.wind_kph;
    document.getElementById('wind_dir').innerText = weather.wind_dir;
    document.getElementById('wind_degree').innerText = weather.wind_degree;
}

// Function to get weather data for multiple predefined cities
async function getWeatherForCities() {
    const cities = ['Mumbai', 'Hyderabad', 'Pune', 'New Delhi', 'Calcuta', 'Chennai'];
    const apiKey = ''; // Add your API key here
    const urlTemplate = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    for (const city of cities) {
        try {
            console.log(`Fetching data for city: ${city}`);
            const response = await fetch(urlTemplate + encodeURIComponent(city), options);
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
                throw new Error(`City not found or API request failed. Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Weather data for ${city}:`, data);
            addWeatherToTable(city, data);
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error.message);
        }
    }
}

// Function to add weather data to the table
function addWeatherToTable(city, data) {
    const weather = data.current;

    document.getElementById(`${city.toLowerCase()}_temperature`).innerText = weather.temp_c;
    document.getElementById(`${city.toLowerCase()}_wind_speed`).innerText = weather.wind_kph;
    document.getElementById(`${city.toLowerCase()}_cloud`).innerText = weather.cloud;
    document.getElementById(`${city.toLowerCase()}_humidity`).innerText = weather.humidity;
    document.getElementById(`${city.toLowerCase()}_heat_index`).innerText = weather.feelslike_c;
    document.getElementById(`${city.toLowerCase()}_wind_direction`).innerText = weather.wind_dir;
    document.getElementById(`${city.toLowerCase()}_uv`).innerText = weather.uv;

}

// Initialize weather data for multiple cities on page load
document.addEventListener('DOMContentLoaded', getWeatherForCities);
