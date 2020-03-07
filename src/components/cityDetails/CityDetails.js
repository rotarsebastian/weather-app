import React, { Component } from 'react';
import '../../assets/weather-icons/icons.css';
import './cityDetails.css';
import getWeatherIcon from '../../helpers/weatherIcon.js';

export default class CityDetails extends Component {

    getTime = (time, timezone) => {
        const dateObj = new Date(time * 1000); 
        const utcString = dateObj.toLocaleString(undefined, { timeZone: timezone }); 
        return utcString.split(',')[1].slice(0, -3).trim();
    }

    render () {
        const { cityData, cityName } = this.props;
        const { time, icon, humidity, windSpeed, temperature, apparentTemperature, precipProbability, summary, cloudCover, pressure } = cityData.currently;
        console.log(cityData);
        const cityTime = this.getTime(time, cityData.timezone);
        const underCityNameWeatherIcon = 'city-weather-icon wi ' + getWeatherIcon(icon);

        const cityPropertiesLeftSide = [
            {
                propertyName: 'Time',
                propertyIcon: 'wi-time-2',
                propertyValue: cityTime
            },
            {
                propertyName: 'Humidity',
                propertyIcon: 'wi-humidity',
                propertyValue: `${humidity * 100} %`
            },
            {
                propertyName: 'Wind speed',
                propertyIcon: 'wi-strong-wind',
                propertyValue: `${Math.round(windSpeed)} m/s`
            },
            {
                propertyName: 'Atmospheric pressure',
                propertyIcon: 'wi-direction-down',
                propertyValue: `${Math.round(pressure)} mb`
            },
        ];

        const cityPropertiesRightSide = [
            {
                propertyName: 'Temperature',
                propertyIcon: 'wi-thermometer',
                propertyValue: `${Math.round(temperature)} °C`
            },
            {
                propertyName: 'Feels like',
                propertyIcon: 'wi-celsius',
                propertyValue: `${Math.round(apparentTemperature * 10) / 10} °C`
            },
            {
                propertyName: 'Rain probability',
                propertyIcon: 'wi-raindrop',
                propertyValue: `${precipProbability * 100} %`
            },
            {
                propertyName: 'Sky clouds coverage',
                propertyIcon: 'wi-cloudy',
                propertyValue: `${cloudCover * 100} %`
            },
        ];

        return (
            <div className='city-details-container'>
                <div className='city-name'>{cityName}</div>
                <div className={underCityNameWeatherIcon}></div>
                <div className='city-summary'>{summary}</div>

                <div className='city-data-container'>

                    <div className='city-left-container'>
                        {cityPropertiesLeftSide.map((city, index) => {
                            const wholeIconClassName = 'city-current-data-icon wi ' + city.propertyIcon;
                            return (
                                <div key={index} className='city-current-data-container'>
                                    <div className='city-current-data-property-container'>
                                        <div className={wholeIconClassName}></div>
                                        <div className='city-current-data-text'>{city.propertyName}</div>
                                    </div>
                                    <div className='city-current-data-value'>{city.propertyValue}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='city-right-container'>
                        {cityPropertiesRightSide.map((city, index) => {
                            const wholeIconClassName = 'city-current-data-icon wi ' + city.propertyIcon;
                            return (
                                <div key={index} className='city-current-data-container'>
                                    <div className='city-current-data-property-container'>
                                        <div className={wholeIconClassName}></div>
                                        <div className='city-current-data-text'>{city.propertyName}</div>
                                    </div>
                                    <div className='city-current-data-value'>{city.propertyValue}</div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        )
    }
}