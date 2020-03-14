const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy("/forecast", {
            target: "https://api.darksky.net",
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/weather", {
            target: "http://api.openweathermap.org/data/2.5",
            secure: false,
            changeOrigin: true
        })
    );
};