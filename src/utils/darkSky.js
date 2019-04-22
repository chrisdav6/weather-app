const request = require("request");
require("dotenv").config();

const darkSky = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lon}`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      let deg = Math.round(body.currently.temperature);
      let rain = Math.round(body.currently.precipProbability * 100);
      let summary = body.daily.data[0].summary;
      let message = `It's currently ${deg} degrees out. There is a ${rain}% chance of rain. ${summary}`;
      callback(undefined, message);
    }
  });
};

module.exports = darkSky;