let express = require("express");
let cookieParser = require("cookie-parser");


let app = new express();
app.use(cookieParser("45679897"))

app.get("", function(req, res) {
	res.send("首页");
})

app.get("/set", function(req, res) {
	res.cookie("name", "jack", {
		maxAge: 60000,
		path: "/get",
		signed: true
	})

	res.send("设置cookie成功！")
})

app.get("/get", function(req, res) {
	res.send(req.signedCookies)

})
app.listen(8888, "127.0.0.1");