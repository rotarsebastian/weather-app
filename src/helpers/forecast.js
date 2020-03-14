//import request from 'request-promise';
import axios from 'axios';
// import aK from '../assets/accessKey.js';

const forecast = async(latitude, longitude, options) => {
  let url;
  options ? url = `/forecast/${process.env.REACT_APP_DARKSKY}/${latitude},${longitude}?units=si&lang=en`
    : url = `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER}&units=metric`;
  try {
    // const proxiedRequest = request.defaults({ proxy: 'http://USER:PASSWORD@myProxy:8080' });
    // const proxyAdded = 'https://cors-anywhere.herokuapp.com/' + url;
    const response = await axios.get(url);
    const { data } = response.data;
    console.log(data);
    if(!!options) {
      const customWeatherObject = {};
      customWeatherObject.currently = {...data.currently};
      customWeatherObject.timezone = data.timezone;
      return customWeatherObject;
    } else {
      return data;
    }
  } catch(err) {
    return console.log('Unable to connect to weather service!', err);
  }
};

export default forecast;