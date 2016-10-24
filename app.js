var express = require("express");
var request = require('superagent');
var PORT = 4000 || process.env.PORT;
var app = express();

app.get("/",function(req,res){
	res.sendfile("index.html");
})
app.get("/api",function(req,res){
	var value = req.query.text;
	value = encodeURIComponent(value)
	var url = "https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?utt="+value+"&APIKEY="+process.env.DOCOMO_API_KEY;
	request
		.get(url)
		.end(function(err,r){
			console.log(r.body)
			res.json({
				res: r.body.utt
			})
		})
})

app.listen(PORT,function(){
	console.log("app is http://localhost:"+PORT)
})