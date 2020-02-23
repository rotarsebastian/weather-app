import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import './home.css';
import './weather-icons.min.css';
import majorCities from '../../assets/major-cities/majorCities.js';
import forecast from "../../helpers/forecast.js";
import getWeatherIcon from "../../helpers/weatherIcon.js";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 15.0898,
            lat: 53.8755,
            zoom: 3
        };
    }
        

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoicm90YXJzZWJhc3RpYW4iLCJhIjoiY2s2bms3MmMyMGI0cDNtcWJsODB2dW03ZCJ9.Lc1q2J-07Nm3wzWSZr6VeA';
    
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            attributionControl: false,
            // interactive: false
        });

        // map.scrollZoom.disable();

        map.on('load', () => {
            map.removeLayer('country-label');
            map.removeLayer('state-label');
            map.removeLayer('settlement-label');
            // add markers to map
            majorCities.forEach(marker => {
                forecast(marker.geometry.coordinates[1], marker.geometry.coordinates[0], (errorForecast, weather) => {
                    if (errorForecast) {
                        return console.log('Forecast error:', errorForecast);
                    } else {
                        // create a HTML element for each feature
                        const el = document.createElement('div');
                        
                        const iconClassName = getWeatherIcon(weather.icon);
                        el.className = 'marker wi ' + iconClassName;
                    

                        const linearOffset = Math.round(Math.sqrt(0.5 * Math.pow(10, 2)));
                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el)
                            .setLngLat(marker.geometry.coordinates)
                            .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, offset: [linearOffset, -linearOffset]})  
                                .setHTML('<p>' + Math.round(weather.temperature) + '°C</p><h4>' + marker.properties.capital + '</h4>'))
                            .addTo(map)
                            .togglePopup();

                        el.addEventListener('click', (evt) => {
                            evt.stopPropagation()
                        })
                    }
                });
            });
        });
        
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

    }

    render() { 
        console.log(this.state)
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}
