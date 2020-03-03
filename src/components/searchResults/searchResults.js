import React, { Component } from 'react';
import '../../assets/weather-icons/icons.css';
import getWeatherIcon from '../../helpers/weatherIcon.js';
import './searchResults.css';

export default class SearchResults extends Component {

    render() {
        const { search } = this.props;

        if (search && search.length > 0) {
            return (
                <div className="search-container">
                    <div className="search-results">
                        {search.map((city, index) => {
                            const { location, temperature, weatherIcon } = city;
                            const iconClassName = 'icon-box wi ' + getWeatherIcon(weatherIcon);
                            let updatedLocation = '';
                            if(location.split(',').length > 3) {
                                updatedLocation = location.split(',')[0] + ', ' +  location.split(',')[location.split(',').length - 1];
                            }

                            return (
                                <div key={index} className='result-container'>
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