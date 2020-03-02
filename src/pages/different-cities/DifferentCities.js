import React, { Component } from "react";
import './differentCities.css';
import searchIcon  from '../../assets/searchIcon.svg';
import SearchResults from "../../components/searchResults/searchResults";

export default class DifferentCities extends Component {

    state = {
        searchValue: undefined,
        hasSearchedBefore: false,
    }

    handleOnInput = (event) => {
        const { hasSearchedBefore, timer } = this.state;
        event.persist();
        clearTimeout(timer);
        if(!hasSearchedBefore) {
            this.setState({timer: setTimeout(() => {
                this.setState({searchValue: event.target.value, hasSearchedBefore: true});
            }, 1000)});
        } else {
            this.setState({searchValue: event.target.value});
        }
        
    }

    render() {
        const { searchValue } = this.state;
        return (
            <div>
                <div className="search-bar-container">
                    <div className="search-bar">
                            <img className="search-icon" src={searchIcon} alt="search-icon" />
                            <input id="search_input" className="search-bar-input" name="search" placeholder="Search for a city" onInput={(event) => this.handleOnInput(event)}  />
                    </div>
                </div>
                <div id="results">
                    <SearchResults search={searchValue} />
                </div>
            </div>
        );
    }
}