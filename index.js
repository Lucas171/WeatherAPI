const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const ejs = require('ejs');
const app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("index", {errMessage: null});
});

app.post("/", function(req, res) {
  var apiKey = "47ec556034454d8caf815808190412";
  var city = req.body.zipcode;

  request('http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q= ' + city, function(error, response, body) {
    var data = JSON.parse(body);

    var statusCode = response.statusCode;


    if(statusCode == 200){
      var city = data.location.name;
      var temp = data.current.temp_f;
      var time = data.location.localtime;
      var message1 = "I've heard ";
      var message2 = " is a wonderful place! It is currently ";
      var message3 = " in "
      var message4 = ". The current date and time there is "


      res.render('index2', {message1: message1, message2: message2, message3: message3, message4: message4, city: city, temp: temp, time: time})
    } else{

      var errMessage = "Please try a different zipcode or city";
      res.render('index', {errMessage: errMessage, city: null, temp: null, time: null});
    }






  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started on port!");
});
