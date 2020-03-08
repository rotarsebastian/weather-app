import request from 'request-promise';

const geocode = async(address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm90YXJzZWJhc3RpYW4iLCJhIjoiY2s2bms3MmMyMGI0cDNtcWJsODB2dW03ZCJ9.Lc1q2J-07Nm3wzWSZr6VeA&limit=2&lang=en`;
    
    try {
        const response = await request({url, json: true});
        const { features: cities } = response;
        if(cities.length === 0) {
            return console.log('Unable to find location. Try another search!');
        } else {
            let citiesArray = [];
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
