import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import './home.css';
import majorCities from '../../assets/map-cities/majorCities.js';
import romanianCities from '../../assets/map-cities/romanianCities.js';
import ro_flag from '../../assets/images/roFlag.svg';
import forecast from "../../helpers/forecast.js";
import getWeatherIconMap from '../../helpers/weatherIconOpenMap.js';
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

            const { lng, lat, zoom, currentMarkers } = this.state;

            mapboxgl.accessToken = process.env.REACT_APP_MAP;
            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom,
                attributionControl: false,
            });

            map.on('load', () => {
                const layersToRemove = ['country-label', 'state-label', 'settlement-label'];
                layersToRemove.forEach(layer => map.removeLayer(layer));
                map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }));
                // add markers to map
                this.addMarkers(map, majorCities, currentMarkers);
            });
            
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });
    
            map.on('zoom', () => {
                const { zoom, currentMarkersRO } = this.state;
                if(Math.round(zoom * 10) / 10 < 3.5) {
                    this.hideMarkers();
                } else {
                    this.showMarkers(map);
                }

                if(currentMarkersRO.length > 0 && Math.round(zoom * 10) / 10 < 5.70) {
                    this.hideMarkers('ro');
                } else if (currentMarkersRO.length > 0){
                    this.showMarkers(map, 'ro');
                }
            });
            this.setState({map});
        }
    }

    addMarkers = (map, citiesToShow, currentMarkersToShow) => {
        citiesToShow.forEach(async (marker)=> {
            const weather = await forecast(marker.geometry.coordinates[1], marker.geometry.coordinates[0]);

            // create a HTML element for each feature
            const markerHTML = document.createElement('div');

            if(weather) {
                const iconClassName = getWeatherIconMap(weather.weather[0].icon);
                markerHTML.className = 'marker wi ' + iconClassName;
    
                // make a marker for each feature and add to the map
                const oneMarker = new mapboxgl.Marker(markerHTML)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, anchor: 'center'})  
                        .setHTML('<p>' + Math.round(weather.main.temp) + '°C</p><h4>' + marker.properties.city + '</h4>'))
                    .addTo(map)
                    .togglePopup();
                    currentMarkersToShow.push(oneMarker);
    
            } else {
                console.log('Error returning the weather');
            }

            markerHTML.addEventListener('click', (evt) => {
                evt.stopPropagation();
            });
        });
    }

    hideMarkers = (type) => {
        const { currentMarkers: europeMarkers, currentMarkersRO: roMarkers } = this.state;
        let markers;
        (type && type === 'ro') ? markers = roMarkers : markers = europeMarkers;
        markers.forEach(marker => {
            marker.remove();
        });
    }

    showMarkers = (map, type) => {
        const { currentMarkers: europeMarkers, currentMarkersRO: roMarkers } = this.state;
        let markers;
        (type && type === 'ro') ? markers = roMarkers : markers = europeMarkers;
        markers.forEach(marker => {
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
            map.flyTo({ center: [26.1550, 46.2778], zoom: 6.28});
        } else {
            map.flyTo({ center: [24.9152, 46.0655], zoom: 6.39});
        }

        if(currentMarkersRO.length < 1) {
            this.addMarkers(map, romanianCities, currentMarkersRO);
        } 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() { 
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
                <div className="ro-weather" onClick={() => this.centerRomania()} ><img className="ro-flag-img" src={ro_flag} alt="logo"/></div>
            </div>
        )
    }
}
