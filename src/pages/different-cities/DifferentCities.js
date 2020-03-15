import React, { Component } from "react";
import './differentCities.css';
import searchIcon  from '../../assets/images/searchIcon.svg';
import SearchResults from "../../components/searchResults/SearchResults.js";
import geocode from "../../helpers/geocode.js";
import forecast from "../../helpers/forecast.js";
import CityDetails from "../../components/cityDetails/CityDetails.js";
import { DebounceInput } from 'react-debounce-input';


export default class DifferentCities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            resultsData: [],
            inputClass: 'search-bar-input'
        }
    }

    handleSearchCity = (coordinates, location) => {
        this.getWeather(coordinates, (weatherData) => {
            this.setState({inputValue: '', showCityDetails: weatherData, resultsData: [], currentCityDetailed: location, inputClass: 'search-bar-input'});
        });
    }

    handleOnInput = (inputElement) => {
        const { value: inputValue } = inputElement;
        if (inputElement.value.length === 0) {
            this.setState({resultsData: [], inputClass: 'search-bar-input'});
            return;
        }
        this.loadContent(inputValue, (resultsData) => {
            if(typeof resultsData === 'string' && resultsData.indexOf('Error') > -1 ) {
                return;
            } else {
                this.setState({inputValue, resultsData, inputClass: 'search-bar-input result-are-open'});
            } 
        });
    }

    getWeather = async(coordinates, cb) => {
        const data = await forecast(coordinates[1], coordinates[0], 'city');
        // ENABLE WEEKLY FORECAST - MUST BE PAID
        // const weeklyData = await forecast(coordinates[1], coordinates[0], 'week');
        // const mergedData = {...data, ...weeklyData}; 
        return data ? cb(data) : null;
    }

    loadContent = async(search, cb) => {
        try {
            const citiesArray = await geocode(search);
            if(citiesArray) {
                const newCities = citiesArray.map(async(city) => {
                    const newCity = {...city};
                    const weather = await forecast(city.coordinates[1], city.coordinates[0]);
                    if(weather) {
                        newCity.temperature = Math.round(weather.main.temp).toString() + '°';
                        newCity.weatherIcon = weather.weather[0].icon;
                    }
                    return newCity;
                });
                Promise.all(newCities).then((completed) => cb(completed));
            }
        } catch (err) {
            return console.log('Content failed to load:', err);
        }
    }

    render() {
        const { resultsData, showCityDetails, currentCityDetailed, inputClass, inputValue } = this.state;   
        return (
            <div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <img className="search-icon" src={searchIcon} alt="search-icon" />
                        <DebounceInput
                            className={inputClass}
                            placeholder="Search for a city" 
                            minLength={2}
                            value={inputValue}
                            debounceTimeout={400}
                            onChange={({ target }) => this.handleOnInput(target)} />
                    </div>
                </div>
                <div id="results">
                    <SearchResults search={resultsData} onSelectCity={this.handleSearchCity} />
                </div>
                {showCityDetails ? <CityDetails cityData={showCityDetails} cityName={currentCityDetailed} /> : <div className="city-details-default">Start a new search for a more detailed forecast for your city</div>}
            </div>
        );
    }
}