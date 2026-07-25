// Weather API Configuration
const API_KEY = '10d3e2849aa7ac3c4b78ba9c52e0e27f'; // Free tier from OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const forecastSection = document.getElementById('forecastSection');
const hourlySection = document.getElementById('hourlySection');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    } else {
        showError('Please enter a city name!');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load default weather on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});

// Get coordinates from city name
async function getCityCoordinates(city) {
    try {
        const response = await fetch(
            `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.length === 0) {
            showError(`City "${city}" not found. Please try another.`);
            return null;
        }
        
        return data[0];
    } catch (error) {
        showError('Error fetching city coordinates: ' + error.message);
        return null;
    }
}

// Fetch weather data
async function fetchWeather(city) {
    showLoading(true);
    hideError();
    
    try {
        // Get coordinates
        const coordinates = await getCityCoordinates(city);
        if (!coordinates) {
            showLoading(false);
            return;
        }
        
        const { lat, lon } = coordinates;
        
        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        
        // Fetch forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        
        // Fetch air pollution for AQI
        const aqiResponse = await fetch(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiResponse.json();
        
        showLoading(false);
        displayWeather(weatherData, coordinates);
        displayForecast(forecastData);
        displayAirQuality(aqiData);
        displayHourlyWeather(forecastData);
        
    } catch (error) {
        showLoading(false);
        showError('Error fetching weather data: ' + error.message);
    }
}

// Display current weather
function displayWeather(data, coordinates) {
    const { name } = coordinates;
    const { temp, feels_like, humidity, pressure } = data.main;
    const { description, main } = data.weather[0];
    const { speed } = data.wind;
    const { visibility } = data;
    const { sunrise, sunset } = data.sys;
    
    // Update DOM
    document.getElementById('cityName').textContent = `${name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = getCurrentDate();
    document.getElementById('temperature').textContent = Math.round(temp);
    document.getElementById('feelsLike').textContent = Math.round(feels_like);
    document.getElementById('description').textContent = description;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${(speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${pressure} mb`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('uvIndex').textContent = getUVIndex(data.clouds.all);
    
    // Update weather icon
    const icon = getWeatherIcon(main);
    document.getElementById('weatherIcon').className = `fas ${icon}`;
    
    // Show weather card
    weatherCard.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    const forecasts = {};
    
    // Group forecasts by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!forecasts[date]) {
            forecasts[date] = [];
        }
        forecasts[date].push(item);
    });
    
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    
    // Display first 5 days
    Object.keys(forecasts).slice(0, 5).forEach(date => {
        const dayData = forecasts[date];
        const temps = dayData.map(d => d.main.temp);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        const condition = dayData[0].weather[0].main;
        const icon = getWeatherIcon(condition);
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${formatDate(new Date(date))}</div>
            <div class="forecast-icon"><i class="fas ${icon}"></i></div>
            <div class="forecast-temp">
                <span class="forecast-temp-high">${Math.round(maxTemp)}°</span>
            </div>
            <div class="forecast-temp-low">Low: ${Math.round(minTemp)}°</div>
            <div class="forecast-condition">${condition}</div>
        `;
        forecastContainer.appendChild(card);
    });
    
    forecastSection.classList.remove('hidden');
}

// Display hourly weather
function displayHourlyWeather(data) {
    const hourlyContainer = document.getElementById('hourly');
    hourlyContainer.innerHTML = '';
    
    // Display next 12 hours
    data.list.slice(0, 12).forEach(item => {
        const time = new Date(item.dt * 1000);
        const hour = time.getHours().toString().padStart(2, '0') + ':00';
        const temp = Math.round(item.main.temp);
        const humidity = item.main.humidity;
        const condition = item.weather[0].main;
        const icon = getWeatherIcon(condition);
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${hour}</div>
            <div class="hourly-icon"><i class="fas ${icon}"></i></div>
            <div class="hourly-temp">${temp}°C</div>
            <div class="hourly-humidity">💧 ${humidity}%</div>
        `;
        hourlyContainer.appendChild(card);
    });
    
    hourlySection.classList.remove('hidden');
}

// Display air quality
function displayAirQuality(data) {
    const aqi = data.list[0].main.aqi;
    const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const aqiLabel = aqiLabels[aqi - 1] || 'Unknown';
    document.getElementById('aqi').textContent = aqiLabel;
}

// Get weather icon based on condition
function getWeatherIcon(condition) {
    const iconMap = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-cloud-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    return iconMap[condition] || 'fa-cloud-sun';
}

// Get UV Index (approximate based on cloud coverage)
function getUVIndex(cloudCoverage) {
    const uvIndex = Math.max(0, 11 - (cloudCoverage * 0.11));
    return uvIndex.toFixed(1);
}

// Utility Functions
function getCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showLoading(show) {
    if (show) {
        loading.classList.remove('hidden');
        weatherCard.classList.add('hidden');
        forecastSection.classList.add('hidden');
        hourlySection.classList.add('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

function hideError() {
    errorDiv.classList.remove('show');
    errorDiv.textContent = '';
}