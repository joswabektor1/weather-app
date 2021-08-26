const path = require("path");
const express = require("express");
const hbs = require("hbs")
const request = require("request");
const urlMap = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Agik talon'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Agik talon'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Agik talon una ulo',
    title: 'Help',
    name: 'Agik talon'
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  } else {
    urlMap(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({error});
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error});
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address

        });
        
      });
    });
  }
}); 

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Help page not found',
    name: 'Agik talon',
    errorMessage:'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('error',{
    title: '404',
    name: 'Agik talon',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
