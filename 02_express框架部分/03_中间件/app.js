let express = require("express");
let app = new express();

let cookieParser = require("cookie-parser");
app.use(cookieParser("13245679679"));

app.get("/", function (req, res) {
    res.send("index")
})

app.get("/get", function (req, res) {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.get("/set", function (req, res) {
    // maxAge:时效性毫秒
    // path限定只有/get路由下才能获取cookie
    //signed:true,存储时加密存储
    res.cookie("roseCookie", "rose", {maxAge: 300000, path: "/get", signed: true});
    res.send("设置cookie成功")
})

app.listen(8888, "localhost");



