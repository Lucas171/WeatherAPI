const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const port = 3000 || process.env.PORT
const ejs = require('ejs');
const app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var apiKey = "47ec556034454d8caf815808190412";
  var city = req.body.zipcode;

  request('http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q= ' + city, function(error, response, body) {
    var data = JSON.parse(body);


    var city = data.location.name;
    var temp = data.current.temp_f;
    var time = data.location.localtime;




    res.render('index', {city: city, temp: temp, time: time})

  });
});

app.listen(port, function() {
  console.log("Server has started on port!");
});
