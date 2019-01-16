let express = require("express");
let app = new express();


// 添加应用级中间件,中间传递一个函数,可以起到控制权限的效果
app.use(function (req, res, next) {
    console.log(new Date()); //这个位置不能res.send();不然就结束了
    // console.log(req.route.path);
    console.log(req)

    next(); //继续向下匹配
})

//也可以单独匹配某一个路由
app.use("/login", function (req, res, next) {
    console.log("这是app.use匹配的/login");
    next(); //继续向下匹配
})

app.get("/", function (req, res) {
    console.log(req.route.path)
    console.log(req)
    res.send("首页")
})

app.get("/login", function (req, res) {
    res.send("登录页")
})
app.get("/register", function (req, res) {
    res.send("注册")
})

//字后都没有匹配上
app.use(function (req, res) {
    res.status(404).send("这是404页面，路由都没有匹配上")
})
app.listen(8888, "localhost");