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
            resultsData: []
        }
    }

    handleSearchCity = (coordinates, location) => {
        this.inputElement.current.value = '';
        this.inputElement.current.classList.remove('result-are-open');
        this.getWeather(coordinates, (weatherData) => {
            this.setState({showCityDetails: weatherData, resultsData: [], currentCityDetailed: location});
        });
    }

    handleOnInput = (inputElement) => {
        const { value: inputValue } = inputElement;
        if(inputValue.length === 2) {
            this.setState({resultsData: []});
            inputElement.classList.remove('result-are-open');
            return;
        }
        this.loadContent(inputValue, (resultsData) => {
            if(typeof resultsData === 'string' && resultsData.indexOf('Error') > -1 ) {
                return;
            } else {
                inputElement.classList.add('result-are-open');
                this.setState({resultsData});
            } 
        });
    }

    getWeather = async(coordinates, cb) => {
        const data = await forecast(coordinates[1], coordinates[0], 'city');
        cb(data);
    }

    loadContent = async(search, cb) => {
        if(search === undefined || search.length === 0)
            return;
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
        const { resultsData, showCityDetails, currentCityDetailed } = this.state;        
        return (
            <div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <img className="search-icon" src={searchIcon} alt="search-icon" />
                        <DebounceInput
                            id="search_input"
                            className="search-bar-input"
                            placeholder="Search for a city" 
                            minLength={2}
                            debounceTimeout={300}
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