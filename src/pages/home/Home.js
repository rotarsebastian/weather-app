import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import './home.css';
import majorCities from '../../assets/map-cities/majorCities.js';
import romanianCities from '../../assets/map-cities/romanianCities.js';
import ro_flag from '../../assets/images/roFlag.svg';
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
            currentMarkers: [],
            currentMarkersRO: []
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

            this.setState({map});
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

    hideMarkers = (type) => {
        let currentMarkers;
        if(type && type === 'ro') {
            currentMarkers = this.state.currentMarkersRO;
        } else {
            currentMarkers = this.state.currentMarkers;
        }
        currentMarkers.forEach(marker => {
            marker.remove();
        });
    }

    showMarkers = (map, type) => {
        let currentMarkers;
        if(type && type === 'ro') {
            currentMarkers = this.state.currentMarkersRO;
        } else {
            currentMarkers = this.state.currentMarkers;
        }
        currentMarkers.forEach(marker => {
            marker
                .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, anchor: 'center'})
                    .setHTML('<p>' + marker._popup._content.innerText.split('°C')[0] + '°C</p><h4>' + marker._popup._content.innerText.split('°C')[1].trim() + '</h4>'))
                .addTo(map)
                .togglePopup();
        });
    }

    centerRomania = () => {
        const { map, currentMarkersRO } = this.state;
        if(window.screen.width < 768) {
            map.flyTo({ center: [24.9707, 45.7570], zoom: 4.70});
        } else {
            map.flyTo({ center: [24.9152, 46.0655], zoom: 6.39});
        }

        this.hideMarkers();

        if(currentMarkersRO.length < 1) {
            romanianCities.forEach(async (marker)=> {
                const weather = await forecast(marker.lat, marker.lng);
    
                // create a HTML element for each feature
                const markerHTML = document.createElement('div');
    
                if(weather) {
                    const iconClassName = getWeatherIcon(weather.icon);
                    markerHTML.className = 'marker wi ' + iconClassName;
        
                    // make a marker for each feature and add to the map
                    const oneMarker = new mapboxgl.Marker(markerHTML)
                        .setLngLat([marker.lng, marker.lat])
                        .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, anchor: 'center'})  
                            .setHTML('<p>' + Math.round(weather.temperature) + '°C</p><h4>' + marker.city + '</h4>'))
                        .addTo(map)
                        .togglePopup();
                        this.state.currentMarkersRO.push(oneMarker);
        
                } else {
                    console.log('Error returning the weather');
                }
    
                markerHTML.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                });
            });
        } else {
            this.showMarkers(map, 'ro');
        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() { 
        const { map, zoom, currentMarkersRO } = this.state;
        if(currentMarkersRO.length > 0 && zoom < 4.70) {
            this.hideMarkers('ro');
        } else {
            this.showMarkers(map, 'ro');
        }
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <div className="ro-weather" onClick={() => this.centerRomania()} ><img className="ro-flag-img" src={ro_flag} alt="logo"/></div>
            </div>
        )
    }
}
