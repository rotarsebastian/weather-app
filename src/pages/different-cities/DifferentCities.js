import React, { Component } from "react";
import './differentCities.css';
import searchIcon  from '../../assets/searchIcon.svg';
import SearchResults from "../../components/searchResults/SearchResults";
import geocode from "../../helpers/geocode.js";
import forecast from "../../helpers/forecast.js";
import CityDetails from "../../components/cityDetails/CityDetails";

export default class DifferentCities extends Component {

    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
        this.state = {
            hasSearchedBefore: false,
        }
    }

    handleSearchCity = (coordinates, location) => {
        this.inputElement.current.value = '';
        this.inputElement.current.classList.remove('result-are-open');
        this.getWeather(coordinates, (weatherData) => {
            this.setState({showCityDetails: weatherData, resultsData: undefined, currentCityDetailed: location});
        });
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
            this.setState({ timer: setTimeout(() => this.showResults(inputValue, event.target), 400) });
        } else {
            this.showResults(inputValue, event.target);
        }  
    }

    getWeather = (coordinates, cb) => {
        forecast(coordinates[1], coordinates[0], (errorForecast, weather) => {
            if (errorForecast) {
                return console.log('Forecast error:', errorForecast);
            } else {
                cb(weather);
            }
        }, 'city');
    }

    showResults = (inputValue, element) => {
        setTimeout(() => {
            this.loadContent(inputValue, (resultsData) => {
                if(typeof resultsData === 'string' && resultsData.indexOf('Error') > -1 ) {
                    console.log(resultsData);
                    return;
                } else {
                    this.setState({resultsData, hasSearchedBefore: true});
                    element.classList.add('result-are-open');
                }
            });   
        }, 500);
    }

    loadContent = (search, cb) => {
        if(search === undefined || search.length === 0)
            return;
        try {
            geocode(search, (error, citiesArray) => {
                if (error) {
                    cb('geocodeError');
                } else {
                    let newCities = [];
                    citiesArray.forEach(async(city, index, array) => {
                        await forecast(city.coordinates[1], city.coordinates[0], (errorForecast, weather) => {
                            if (errorForecast) {
                                cb('forecastError');
                            } else {
                                let newCity = {...city};
                                newCity.temperature = Math.round(weather.temperature).toString() + '°';
                                newCity.weatherIcon = weather.icon;
                                newCities.push(newCity);
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
        const { resultsData, showCityDetails, currentCityDetailed } = this.state;
        
        return (
            <div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <img className="search-icon" src={searchIcon} alt="search-icon" />
                        <input id="search_input" ref={this.inputElement} className="search-bar-input" name="search" placeholder="Search for a city" onInput={(event) => this.handleOnInput(event)}  />
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