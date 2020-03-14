import React, { Component } from 'react';
import '../../assets/weather-icons/icons.css';
import getWeatherIconMap from '../../helpers/weatherIconOpenMap.js';
import './searchResults.css';

export default class SearchResults extends Component {

    handleChooseCity = (coordinates, location) => {
        this.props.onSelectCity(coordinates, location);            
    }

    render() {
        const { search }  = this.props;
        if (search && search.length > 0) {
            return (
                <div className="search-container">
                    <div className="search-results">
                        {search.map((city, index) => {
                            const { location, temperature, coordinates, weatherIcon } = city;
                            const iconClassName = 'icon-box wi ' + getWeatherIconMap(weatherIcon);
                            let updatedLocation = '';
                            if(location.split(',').length > 3) {
                                updatedLocation = location.split(',')[0] + ', ' +  location.split(',')[location.split(',').length - 1];
                            }
                            return (
                                <div key={index} className='result-container' onClick={() => this.handleChooseCity(coordinates, location)}>
                                    <div className='location-name' >{updatedLocation.length > 0 ? updatedLocation : location}</div>
                                    <div className='temperature-icon-container'>
                                        <div className='temperature-value' >{temperature}</div>
                                        <div className={iconClassName}></div>
                                    </div>
                                </div>
                            ); 
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="search-container"></div>
            );
        } 
    }
}