// ===================== FOR PRODUCTION =====================
// import request from 'request-promise';
// const forecast = async(latitude, longitude, options) => {
//   let url;
//   options ? url = `${process.env.REACT_APP_FORECAST}?lat=${latitude}&long=${longitude}`
//     : url = `${process.env.REACT_APP_WEATHER}?lat=${latitude}&long=${longitude}`;
//   try {
//     const response = JSON.parse(await request({ uri: url, json: true, method: 'GET' }));
//     if(!!options) {
//       const customWeatherObject = {};
//       customWeatherObject.currently = {...response.currently};
//       customWeatherObject.timezone = response.timezone;
//       return customWeatherObject;
//     } else {
//       return response;
//     }
//   } catch(err) {
//     return console.log('Unable to connect to weather service!', err);
//   }
// };
// export default forecast;

import axios from 'axios';
import aK from '../assets/accessKey';

const forecast = async(latitude, longitude, options) => {
  let url;
  options ? url = `/forecast/${aK('weather')}/${latitude},${longitude}?units=si&lang=en`
    : url = `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${aK('open-weather')}&units=metric`;
  try {
    const response = await axios.get(url);
    const { data } = response;
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