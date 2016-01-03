var express = require('express'),
    path = require('path'),
    config = require('./config'),
    app = express();

//configuration to handle CORS requests
app.use(function(req,res,next){
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET');
   res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, /Authorization');
   next();
});

//set the static files location
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
   res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get('/:ts',function(req,res){
    var convertTime, timestamp, natural;
    //if the parameter sent is in natural form, set that to natural and convert to timestamp
    if(isNaN(req.params.ts)){
        convertTime = Math.round(Date.parse(req.params.ts));
        //create date object
        var d = new Date(convertTime / 1000);
        timestamp = convertTime;
        natural = d.toDateString();
    }
    //else if the parameter is in timestamp form, convert the stamp to date format and convert to natural form 
    else{
        convertTime = new Date(req.params.ts * 1000);
        timestamp = convertTime / 1000;
        natural = convertTime.toDateString();
    }
    res.send({unix: timestamp, natural:natural});
});


app.listen(config.port, function(){
   console.log('Listening on port: ' + config.port); 
});
