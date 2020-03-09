import React, { Component } from "react";
import './differentCities.css';
import searchIcon  from '../../assets/searchIcon.svg';
import SearchResults from "../../components/searchResults/SearchResults";
import geocode from "../../helpers/geocode.js";
import forecast from "../../helpers/forecast.js";
import CityDetails from "../../components/cityDetails/CityDetails";
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
        cb(data);
    }

    loadContent = async(search, cb) => {
        try {
            const citiesArray = await geocode(search);
            const newCities = citiesArray.map(async(city) => {
                const weather = await forecast(city.coordinates[1], city.coordinates[0]);
                let newCity = {...city};
                newCity.temperature = Math.round(weather.temperature).toString() + '°';
                newCity.weatherIcon = weather.icon;
                return newCity;
            });
            Promise.all(newCities).then((completed) => cb(completed));
        } catch (err) {
            return console.log(err);
        }
    }

    render() {
        console.log(this.state)
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
                {showCityDetails ? <CityDetails cityData={showCityDetails} cityName={currentCityDetailed} /> : null}
            </div>
        );
    }
}