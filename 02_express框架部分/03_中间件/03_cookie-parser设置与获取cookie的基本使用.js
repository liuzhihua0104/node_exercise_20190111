let express = require("express");
let app = new express();

//1、 安装cookie-parser     npm install cookie-parser --save

// 引入
let cookieParser = require("cookie-parser");

// 使用cookieParser中间件
app.use(cookieParser());


app.get("/index", function (req, res) {
    console.log(req.cookies);
    res.send(req.cookies);
})

app.get("/setcookie", function (req, res) {
//  设置cookie ,如果还在有效时间内，关闭浏览器cookie是不会失效的 maxAge多久后失效
    res.cookie("cookieName", "zhangsan", {maxAge: 600000});
    res.send("设置cookie成功");


})


app.listen(8888, "127.0.0.1")