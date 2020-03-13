import request from 'request-promise';
import aK from '../assets/accessKey.js';

const forecast = async(latitude, longitude, options) => {
  // const url = `https://api.darksky.net/forecast/${aK('weather')}/${latitude},${longitude}?units=si&lang=en`;
  // const urlOpenWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${aK('open-weather')}&units=metric`;
  let url;
  if(options) {
    url = `https://api.darksky.net/forecast/${aK('weather')}/${latitude},${longitude}?units=si&lang=en`;;
  } else {
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${aK('open-weather')}&units=metric`;
  }
  try {
    const response = await request({ url, json: true });
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