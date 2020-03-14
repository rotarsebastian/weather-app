const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/forecast",
    createProxyMiddleware({
      target: "https://api.darksky.net",
      changeOrigin: true
    })
  );

  app.use(
    "/data/2.5/weather",
    createProxyMiddleware({
      target: "http://api.openweathermap.org",
      changeOrigin: true
    })
  );
};