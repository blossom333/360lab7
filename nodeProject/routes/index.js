var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});
router.get('/getcity',function(req,res,next) {
  console.log("In getcity route");
  var fs = require('fs');
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
            if(err) throw err;
            var cities = data.toString().split("\n");
            var myRe = new RegExp("^" + req.query.q);
              console.log(myRe);
 	    var jsonresult = [];
            for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
              if(result != -1) {
              console.log(cities[i]);
	      jsonresult.push({city:cities[i]});

             }  
	    }
	     console.log(jsonresult); 
	     res.status(200).json(jsonresult); 
          })

});
router.get('/stateBirds',function(req,res,next) {
  console.log("In state birds route");
  var fs = require('fs');
  fs.readFile(__dirname + '/stateBirds.txt',function(err,data) {
            if(err) throw err;
            var birds = data.toString().split("\n");
	    var states = [];
            var birdNames = [];
	    console.log(birds);
	    for(var i = 0; i < birds.length; i++)
	    {
		var temp = birds[i].split("-");
	        console.log(temp);
		states[i] = temp[0];
		birdNames[i] = temp[1];
	    }
            console.log(states);
            //var myRe = new RegExp("^" + req.query.q);
              console.log(req.query.q);
 	    var jsonresult = [];
            for(var i = 0; i < states.length; i++) {
              var result = states[i].search(req.query.q);
              if(result != -1) {
              console.log(states[i]);
	      jsonresult.push({birds:birdNames[i]});
             }  
	    }
	     console.log(jsonresult); 
	     res.status(200).json(jsonresult); 
          })

});
module.exports = router;
