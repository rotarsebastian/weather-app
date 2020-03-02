import React, { Component } from 'react';
import geocode from "../../helpers/geocode.js";
import forecast from "../../helpers/forecast.js";


export default class SearchResults extends Component {

    state = {
        content: null,
        prevContent: null
    }

    loadContent = (search) => {
        if(this.state.prevContent === this.state.content && this.state.content !== null) {
            return;
        }
        let html = '';
        geocode(search, (error, citiesArray) => {
            if (error) {
                return console.log('Geocode error:', error);
            } else {
                citiesArray.forEach(city => {
                    forecast(city.coordinates[1], city.coordinates[0], (errorForecast, weather) => {
                        if (errorForecast) {
                            return console.log('Forecast error:', errorForecast);
                        } else {
                            city.temperature = Math.round(weather.temperature) + '°C';
                            city.weatherIcon = weather.icon;
                            html += `<div>${city.location}</div>`;
                            const prevContent = this.state.content;
                            this.setState({content: html, prevContent})
                        }
                    });
                });
            }
        }); 
    }

    render() {
        console.log(this.state)
        const { search } = this.props;
        if(search && search.length > 0) {
            this.loadContent(search);
        }
        return (
            <div className="search-container">
                <div className="search-results">
                    {this.state.content}
                </div>
            </div>
        );
    }
}