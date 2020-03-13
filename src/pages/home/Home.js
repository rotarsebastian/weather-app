import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import './home.css';
import majorCities from '../../assets/major-cities/majorCities.js';
import ak from '../../assets/accessKey.js';
import forecast from "../../helpers/forecast.js";
import getWeatherIcon from "../../helpers/weatherIcon.js";
import "../../assets/weather-icons/icons.css";

export default class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            lng: 9.8694,
            lat: 52.3082,
            zoom: 3.5,
            currentMarkers: []
        };
    }
        
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            mapboxgl.accessToken = ak('map');
        
            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom,
                attributionControl: false,
            });

            map.on('load', () => {
                map.removeLayer('country-label');
                map.removeLayer('state-label');
                map.removeLayer('settlement-label');
                map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }));
                // add markers to map
                this.addMarkers(map);
            });
            
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });
    
            map.on('zoom', () => {
                if(Math.round(this.state.zoom * 10) / 10 < 3.5) {
                    this.hideMarkers();
                } else {
                    this.showMarkers(map);
                }
            });

        }
    }

    addMarkers = (map) => {
        majorCities.forEach(async (marker)=> {
            const weather = await forecast(marker.geometry.coordinates[1], marker.geometry.coordinates[0]);

            // create a HTML element for each feature
            const markerHTML = document.createElement('div');

            if(weather) {
                const iconClassName = getWeatherIcon(weather.icon);
                markerHTML.className = 'marker wi ' + iconClassName;
    
                // make a marker for each feature and add to the map
                const oneMarker = new mapboxgl.Marker(markerHTML)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, anchor: 'center'})  
                        .setHTML('<p>' + Math.round(weather.temperature) + '°C</p><h4>' + marker.properties.capital + '</h4>'))
                    .addTo(map)
                    .togglePopup();
                    this.state.currentMarkers.push(oneMarker);
    
            } else {
                console.log('Error returning the weather');
            }

            markerHTML.addEventListener('click', (evt) => {
                evt.stopPropagation();
            });

        });
    }

    hideMarkers = () => {
        const { currentMarkers } = this.state;
        currentMarkers.forEach(marker => {
            marker.remove();
        });
    }

    showMarkers = (map) => {
        const { currentMarkers } = this.state;
        currentMarkers.forEach(marker => {
            marker
                .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, anchor: 'center'})
                    .setHTML('<p>' + marker._popup._content.innerText.split('°C')[0] + '°C</p><h4>' + marker._popup._content.innerText.split('°C')[1].trim() + '</h4>'))
                .addTo(map)
                .togglePopup();
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() { 
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}
