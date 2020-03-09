import request from 'request-promise';

const forecast = async(latitude, longitude, options) => {
  const url = `https://api.darksky.net/forecast/cacc83c7974cf5198e445c762765aab9/${latitude},${longitude}?units=si&lang=en`;

  try {
    const response = await request({ url, json: true });
    if(!!options) {
        let customWeatherObject = {};
        customWeatherObject.currently = {...response.currently};
        customWeatherObject.timezone = response.timezone;
        return customWeatherObject;
    } else {
        return response.currently;
    }
  } catch(err) {
    return console.log('Unable to connect to weather service!', err);
  }
};

export default forecast;