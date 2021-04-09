var express = require('express');
const { HttpError } = require('http-errors');
var router = express.Router();
const request = require('request');

if (process.env.COUNTER_SERVICE == undefined){

  console.log("COUNTER_SERVICE is not defined using localhost")
  var counter_url = "http://127.0.0.1:8080/count/"+process.env.COLOR
}else{
  var counter_url = process.env.COUNTER_SERVICE +"/count/"+process.env.COLOR
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressing' });
});

router.post('/confirm', function(req, res, next) {
  inbody = req.body;

  console.log("Received : " + inbody)
  if (inbody.color == process.env.COLOR){
    console.log(counter_url)
    request.post({headers:{"Accept": "text/plain"},url: counter_url, body: inbody, json:true}, (err, res, body) => {
      if(err){
        console.log("Error counting " + res.statusCode)
        return
      }
      else if (res.statusCode == 404){
        console.log("Counter service is down");
        return
      }
      console.log(body + " is Counted");
    });
    inbody.color = "match"
    return res.json(inbody)
  }else{
    // res.status = 404
    console.log("The service will only confirm " + process.env.COLOR + " but received " + inbody.color);
    return res.sendStatus(404)
  }

})

module.exports = router;
