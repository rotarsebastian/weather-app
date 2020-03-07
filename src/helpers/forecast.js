import request from 'request';

const forecast = (latitude, longitude, callback, options) => {
  const url = `https://api.darksky.net/forecast/cacc83c7974cf5198e445c762765aab9/${latitude},${longitude}?units=si&lang=en`;

  request({ url, json: true }, (errorMessage, { body }) => {
        if (errorMessage) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            if(!!options) {
                let customWeatherObject = {};
                customWeatherObject.currently = {...body.currently};
                customWeatherObject.timezone = body.timezone;
                callback(undefined, customWeatherObject);
            } else {
                callback(undefined, body.currently);
            }
        }
  });
};

export default forecast;