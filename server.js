'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = require('mongodb');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config()

var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
 mongoose.connect(process.env.aa,{useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended: 'false'}));
//app.use(bodyParser.json());

/** this project needs to parse POST bodies **/

const urlSchema = new mongoose.Schema({
  longurl:{type:String,required:true},
  shorturl: Number
})
var url=mongoose.model("Url",urlSchema)


// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/api/shorturl/:num/',function(req, res){
	console.log(req.params.num)
	url.find({shorturl:req.params.num},function(err,data){
		if(err){
			return(err)
			
		}
		console.log(data[0].longurl)
		res.redirect(data[0].longurl)
	})
	
})



  app.post('/api/shorturl/new/',function(req,res){
	  
	  url.count(function(err,data){
		  if(err){
			  return(err)
			  }
			  console.log(data)
		  var newurl=new url(
    {
      longurl: req.body.url,
      shorturl: data+1 
      
    }
  )
  
  newurl.save(function(err, data1){
    if(err)
    return console.error(err)
    //done(null,data)
  }
  )
		res.json({"original_url":req.body.url,"short_url":data+1})	   
	  })
	 
  })
  
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




app.listen(port, function () {
  console.log('Node.js listening ...');
});