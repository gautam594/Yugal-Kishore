# 🌤️ Weather Dashboard

A modern, interactive weather dashboard built with **HTML, CSS, and JavaScript** that fetches real-time weather data from the **OpenWeatherMap API**.

## ✨ Features

### 🎨 Mixed Dark + Colorful Theme
- Dark gradient background with vibrant cyan, pink, and gold accents
- Smooth animations and transitions
- Responsive design for all devices
- Beautiful glassmorphism effects

### 📊 Current Weather
- Real-time temperature and "feels like" temperature
- Weather condition description
- Weather-specific icons with animations
- Current location display with country code

### 📈 Detailed Weather Information
- **Humidity** - Current humidity percentage
- **Wind Speed** - Wind speed in km/h
- **Pressure** - Atmospheric pressure in mb
- **Visibility** - Visibility distance in km
- **UV Index** - Approximate UV index based on cloud coverage
- **Air Quality** - AQI status (Good, Fair, Moderate, Poor, Very Poor)

### 📅 5-Day Forecast
- Daily weather predictions
- High and low temperatures
- Weather conditions with icons
- Hover effects for interactivity

### ⏰ Hourly Weather
- Next 12 hours weather forecast
- Hourly temperature
- Humidity levels
- Weather icons
- Horizontal scrolling for easy viewing

### 🔍 Search Functionality
- Search any city in the world
- Autocomplete with Enter key support
- Error handling for invalid cities
- Loading spinner during data fetch

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for API calls

### Installation

1. Clone the repository or download the files:
```bash
git clone https://github.com/gautam594/Yugal-Kishore.git
cd weather-dashboard
```

2. Open `index.html` in your web browser:
```bash
open index.html
# or
start index.html  # on Windows
```

That's it! The dashboard will load with London's weather by default.

## 📝 Usage

1. **Search for a City**: Enter a city name in the search box and click "Search" or press Enter
2. **View Current Weather**: See temperature, conditions, and detailed metrics
3. **Check Forecast**: Scroll through the 5-day forecast
4. **Hourly Updates**: Check hourly weather in the scrollable hourly section

## 🎨 Color Scheme

- **Primary Background**: Dark navy/black (`#1a1a2e`, `#0f3460`)
- **Accent Cyan**: `#00d4ff` - Used for borders and highlights
- **Accent Pink**: `#ff6b9d` - Used for secondary highlights
- **Accent Gold**: `#ffd700` - Used for important values
- **Accent Green**: `#00ff88` - Used for hourly section

## 🔧 API Configuration

The dashboard uses **OpenWeatherMap API** (Free tier):

```javascript
const API_KEY = '10d3e2849aa7ac3c4b78ba9c52e0e27f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

**To use your own API key:**
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get your free API key
3. Replace the `API_KEY` in `script.js`

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with all features
- **Tablet** (≤768px): 2-column grid layouts
- **Mobile** (≤480px): Single column layout, optimized touch targets

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Animations, Gradients
- **JavaScript (ES6+)**: Async/await, Fetch API
- **FontAwesome Icons**: Weather and info icons
- **OpenWeatherMap API**: Real-time weather data

## 📊 Data Provided

### Current Weather
- Temperature (°C)
- Feels like temperature
- Weather condition
- Humidity (%)
- Wind speed (km/h)
- Atmospheric pressure (mb)
- Visibility (km)
- UV Index
- Air Quality Index (AQI)

### Forecast Data
- 5-day weather predictions
- Daily high/low temperatures
- Weather conditions
- Humidity

## 🎯 Key Features Explained

### Dark Theme with Colorful Accents
```
- Dark navy background for easy on eyes
- Cyan glowing borders for modern look
- Pink accents for temperature highlights
- Gold for important values and icons
- Green for hourly section distinction
```

### Smooth Animations
- Slide-down header animation
- Pop-in weather card effect
- Hover effects on cards
- Smooth color transitions
- Loading spinner animation

### Error Handling
- City not found message
- API error handling
- Network error fallback
- User-friendly error messages

## 🐛 Troubleshooting

**Issue**: Weather data not loading
- Check your internet connection
- Verify the API key is valid
- Check browser console for errors (F12)

**Issue**: City not found
- Make sure you spelled the city name correctly
- Try with a more well-known city
- Use city name in English

**Issue**: Styles not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check that CSS file is in the same directory
- Verify file names are correct

## 📈 Future Enhancements

- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Location auto-detection using geolocation
- [ ] Save favorite cities
- [ ] Weather alerts
- [ ] Detailed weather analysis
- [ ] Historical weather data
- [ ] Multiple language support
- [ ] Dark/Light theme toggle
- [ ] Weather map integration
- [ ] Voice search

## 📄 License

This project is open-source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 👨‍💻 Author

**Yugal Kishore** - [@gautam594](https://github.com/gautam594)

## 📞 Support

For questions or issues, please open an issue on GitHub or contact me via email.

---

**Built with ❤️ and styled with 🎨**