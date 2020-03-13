const  getWeatherIconMap = (icon) => {
    switch(icon) {
        case '01d':
            return 'wi-day-sunny';
        case '01n':
            return 'wi-night-clear';
        case '02d':
            return 'wi-day-cloudy';
        case '02n':
            return 'wi-night-partly-cloudy';
        case '03d':
            return 'wi-cloud';
        case '03n':
            return 'wi-cloud';
        case '04d':
            return 'wi-cloudy';
        case '04n':
            return 'wi-cloudy';
        case '09d':
            return 'wi-day-showers';
        case '09n':
            return 'wi-night-alt-showers';
        case '10d':
            return 'wi-rain';
        case '10n':
            return 'wi-night-alt-rain';
        case '11d':
            return 'wi-thunderstorm';
        case '11n':
            return 'wi-thunderstorm';
        case '13d':
            return 'wi-snow';
        case '13n':
            return 'wi-snow';
        case '50d':
            return 'wi-fog';
        case '50n':
            return 'wi-fog';
        default:
            return 'wi-cloud';
    }
}

export default getWeatherIconMap;