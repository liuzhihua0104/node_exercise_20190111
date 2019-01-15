// 1、安装express框架 npm install express --save
// 2、引入express
var express = require("express");
// 3、实例化express,
var app = new express();

// 4、路由
app.get("/", function (req, res) {
  res.send("首页")
})

app.get("/login", function (req, res) {
  res.send("登录")
})

app.get("/register", function (req, res) {
  res.send("注册")
})

// 动态路由传参(两个，也可以是一个)
app.get("/getid/:id/:two", function (req, res) {
  var id = req.params.id
  console.log(req.params)
  res.send(id + "----" + req.params.two);

})

// 使用正则匹配参数，参数必须是10位数字
app.get(/^\/params\/([\d]{10})$/, function (req, res) {
  var params = req.params;
  console.log(params)
  res.json({id:params[0]})
})


// 5、监听端口
app.listen(8888, "127.0.0.1")
