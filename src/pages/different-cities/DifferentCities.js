import React, { Component } from "react";
import './differentCities.css';
import searchIcon  from '../../assets/searchIcon.svg';
import SearchResults from "../../components/searchResults/SearchResults";
import geocode from "../../helpers/geocode.js";
import forecast from "../../helpers/forecast.js";

export default class DifferentCities extends Component {

    state = {
        hasSearchedBefore: false,
    }

    handleOnInput = (event) => {
        const { hasSearchedBefore, timer } = this.state;
        const { value: inputValue } = event.target;
        event.persist();
        clearTimeout(timer);
        if(inputValue.length < 2) {
            this.setState({resultsData: undefined});
            event.target.classList.remove('result-are-open');
            return;
        }
        if(!hasSearchedBefore) {
            this.setState({ timer: setTimeout(() => this.showResults(inputValue, event.target), 500) });
        } else {
            this.showResults(inputValue, event.target);
        }  
    }

    showResults = (inputValue, element) => {
        element.classList.add('result-are-open');
        setTimeout(() => {
            this.loadContent(inputValue, (resultsData) => {
                this.setState({resultsData, hasSearchedBefore: true});
            });   
        }, 200);
    }

    loadContent = (search, cb) => {
        if(search === undefined || search.length === 0)
            return;
        try {
            geocode(search, (error, citiesArray) => {
                if (error) {
                    return console.log('Geocode error:', error);
                } else {
                    let newCities = [];
                    citiesArray.forEach(async(city, index, array) => {
                        await forecast(city.coordinates[1], city.coordinates[0], (errorForecast, weather) => {
                            if (errorForecast) {
                                return console.log('Forecast error:', errorForecast);
                            } else {
                                city.temperature = Math.round(weather.temperature).toString() + '°';
                                city.weatherIcon = weather.icon;
                                newCities.push(city);
                                if(index === array.length - 1){
                                    cb(newCities);
                                }
                            }
                        });
                    });
                }
            }); 
        } catch (err) {
            return console.log(err);
        }
    }

    render() {
        const { resultsData } = this.state;
        return (
            <div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <img className="search-icon" src={searchIcon} alt="search-icon" />
                        <input id="search_input" className="search-bar-input" name="search" placeholder="Search for a city" onInput={(event) => this.handleOnInput(event)}  />
                    </div>
                </div>
                <div id="results">
                    <SearchResults search={resultsData} />
                </div>
            </div>
        );
    }
}