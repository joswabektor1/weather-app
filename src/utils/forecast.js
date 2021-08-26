const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5f7a87819e10dc277c1f0f25bff2b231&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          `: It is current ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out.
          A humidity of ${body.current.humidity}% and wind speed of ${body.current.wind_speed} km/hr.`
      );
    }
  });
};

module.exports = forecast;
