let express = require("express");
let app = new express();
let bodyParser = require("body-parser");


//配置中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs"); //设置ejs模板

app.get("/", function (req, res) {
    res.send("index")
})

app.get("/login", function (req, res) {
    res.render("form");

})

app.post("/dologin", function (req, res) {
    console.log(req.body);
    res.json(req.body)

})

app.use(function (req, res) {
    res.status(404).send("404")
})

app.listen(8888, "127.0.0.1")