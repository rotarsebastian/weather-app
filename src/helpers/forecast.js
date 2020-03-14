// import request from 'request-promise';
import axios from 'axios';
// import aK from '../assets/accessKey.js';

const forecast = async(latitude, longitude, options) => {
  let url;
  options ? url = `/forecast/${process.env.REACT_APP_DARKSKY ? process.env.REACT_APP_DARKSKY : 'cacc83c7974cf5198e445c762765aab9'}/${latitude},${longitude}?units=si&lang=en`
    : url = `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER ? process.env.REACT_APP_OPEN_WEATHER : '6fcf99aaad393502d0324bf8b15bcad3'}&units=metric`;
  try {
    // const proxyAdded = 'https://cors-anywhere.herokuapp.com/' + url;
    const res = await axios.get(url);
    const { data: response } = res;
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