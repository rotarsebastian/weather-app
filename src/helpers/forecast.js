import request from 'request-promise';

const forecast = async(latitude, longitude, options) => {
  let url;
  options ? url = `${process.env.REACT_APP_FORECAST}?lat=${latitude}&long=${longitude}`
    : url = `${process.env.REACT_APP_WEATHER}?lat=${latitude}&long=${longitude}`;
  try {
    const response = JSON.parse(await request({ uri: url, json: true, method: 'GET' }));
    if(!!options) {
      const customWeatherObject = {};
      customWeatherObject.currently = {...response.currently};
      customWeatherObject.timezone = response.timezone;
      return customWeatherObject;
    } else {
      return response;
    }
  } catch(err) {
    return console.log('Unable to connect to weather service!', err);
  }
};

export default forecast;