import request from 'request';

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm90YXJzZWJhc3RpYW4iLCJhIjoiY2s2bms3MmMyMGI0cDNtcWJsODB2dW03ZCJ9.Lc1q2J-07Nm3wzWSZr6VeA&limit=5&lang=en`;
    request({url, json: true}, (error, response) => {
        const { features } = response.body;
        
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            let citiesArray = [];
            features.forEach(city => {
                citiesArray.push({ coordinates: city.center, location: city.place_name });
            });
            callback(undefined, citiesArray)
        }
    });
};

export default geocode;