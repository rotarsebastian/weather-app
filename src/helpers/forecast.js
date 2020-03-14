import request from 'request-promise';
// import aK from '../assets/accessKey.js';

const forecast = async(latitude, longitude, options) => {
  let url;
  options ? url = `/forecast/${process.env.REACT_APP_DARKSKY}/${latitude},${longitude}?units=si&lang=en`
    : url = `/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER}&units=metric`;
  try {
    //const proxyAdded = 'https://cors-anywhere.herokuapp.com/' + url;
    const response = await request({ url, json: true, method: 'GET' });
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