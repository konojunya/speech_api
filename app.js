var express = require("express");
var request = require('request');
var PORT = 4000 || process.env.PORT;
var app = express();

var status = {
	nickname: "じゅんじゅん",
	nickname_y: "ジュンジュン",
	sex: "男",
	bloodtype: "O",
	birthdateY: 1997,
	birthdateM: 3,
	birthdateD: 3,
	age: 19,
	constellations: "魚座",
	place: "大阪"
};

app.get("/",function(req,res){
	res.sendfile("index.html");
})
app.get("/api",function(req,res){
	var value = req.query.text,
			url = "https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=",
			token = process.env.DOCOMO_API_KEY;

	status.utt = value;
	
	var param = {
		body: JSON.stringify(status),
		"Content-Type": "application/json"
	}

	request.post(url+token,param,function(err,response,data){
		if (err) throw err;
		var body = JSON.parse(data)
		status.context = body.context;
		body.utt = value == "バイバイ" ? "またねー！" : body.utt
		res.json({
			res: body.utt
		})
	});

})

app.listen(PORT,function(){
	console.log("app is http://localhost:"+PORT)
})