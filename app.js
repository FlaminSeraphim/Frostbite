var express         = require ('express');
var app             = express();
var ejs             = require ('ejs');
var mongoose        = require('mongoose');
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var request         = require("request");


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Home Route
app.get('/', function(req, res){

  res.render('home', {workData: req.query.workArea});
});

//Search Route
app.get('/search', function(req, res){
  var url = "https://b9c19a63a96d2c303c9026abcb12bc2a@okcountyrecords.com/api/v1/search?" + "county=" + req.query.county + "&text" +
  req.query.text + "&party_name=" + req.query.party_name + "&party_type" + req.query.party_type +"&book=" +
  req.query.book + "&page=" + req.query.page + "&series=" + req.query.series + "&number=" + req.query.number + "&type=" + req.query.type
  + "&indexed_date_start=" + req.query.date_start + "&indexed_date_end=" + req.query.date_end
  + "&modified_date_start" + req.query.modified_date_start + "&modified_date_end" + req.query.modified_date_end
  + "&results_per_page" + req.query.results_per_page + "&legal_description=" + req.query.legal_description + "&result_page"
  + req.query.result_page + "&order_by" + req.query.order_by + "&order_direction" + req.query.order_direction;
  request(url,function(error, response, body){
    if (error){
      console.log(error)
    }
    console.log(url);
    var data = JSON.parse(body);
    console.log(data);
    res.json( data);
    // res.render('search-results', {workData: req.query.workArea, data: data});
  });

});

//advanced search like see images etc
app.get('/advanced', function(req, res){
  res.render('advanced');
})

var server = app.listen(3000, '0.0.0.0', function(){
  console.log('Listening to port 3000');
});
