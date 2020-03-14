import request from 'request-promise';
import aK from '../assets/accessKey.js';

const forecast = async(latitude, longitude, options) => {
  // const url = `https://api.darksky.net/forecast/${aK('weather')}/${latitude},${longitude}?units=si&lang=en`;
  // const urlOpenWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${aK('open-weather')}&units=metric`;
  let url;
  options ? url = `https://api.darksky.net/forecast/${aK('weather')}/${latitude},${longitude}?units=si&lang=en`
    : url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${aK('open-weather')}&units=metric`;
  try {
    const proxyAdded = 'https://cors-anywhere.herokuapp.com/' + url;
    if(!!options) {
      const response = await request({ uri: proxyAdded, json: true, method: 'GET' });
      const customWeatherObject = {};
      customWeatherObject.currently = {...response.currently};
      customWeatherObject.timezone = response.timezone;
      return customWeatherObject;
    } else {
      const response = await request({ url, json: true, method: 'GET' });
      return response;
    }
  } catch(err) {
    return console.log('Unable to connect to weather service!', err);
  }
};

export default forecast;