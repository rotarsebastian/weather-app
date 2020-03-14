import request from 'request-promise';
import aK from '../assets/accessKey.js';

const geocode = async(address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${aK('map')}&limit=2&lang=en`;
    
    try {
        const proxyAdded = 'https://cors-anywhere.herokuapp.com/' + url;
        const response = await request({uri: proxyAdded, json: true, method: 'GET'});
        const { features: cities } = response;
        if(cities.length === 0) {
            return console.log('Unable to find location. Try another search!');
        } else {
            const citiesArray = [];
            cities.forEach(city => {
                citiesArray.push({ coordinates: city.center, location: city.place_name });
            });
            return citiesArray;
        }
    }
    catch(err) {
        return console.log('Unable to connect to location service!', err);
    }
};

export default geocode;
