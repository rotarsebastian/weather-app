const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/forecast", {
      target: "https://api.darksky.net",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    proxy("/data/2.5/weather", {
      target: "http://api.openweathermap.org",
      secure: false,
      changeOrigin: true
    })
  );
};