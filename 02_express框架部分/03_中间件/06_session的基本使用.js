let express = require("express");
var session = require('express-session');

let app = new express();

// session是基于cookie的
app.use(session({
  secret: 'keyboard cat', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  resave: false,  /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,  //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  // cookie: { secure: true }  //当secure属性设置为true时，cookie只有在https协议下才能上传到服务器，而在http协议下是没法上传的，所以也不会被窃听
  // cookie: { maxAge: 5000 }  //可以添加cookie设置失效时间，如果不写cookie参数， session默认关闭浏览器后失效
}))



app.get("/", function (req, res) {
  console.log(req.session.userInfo)
  if (req.session.userInfo) {  //检测session是否存在
    res.send(req.session.userInfo + "欢迎回来")
  } else {
    // 没有session，重定向跳转到login页
    // res.redirect("/login")
    res.send("失效了")
  }
})

app.get("/login", function (req, res) {
  // 设置session,然后跳转到主页
  req.session.userInfo = "success!"; //设置session
  res.send("登录成功！");
  // req.
  // res.send(new Buffer('<p>some html</p>'));

  // res.redirect("/")

})



app.listen(8888, "127.0.0.1")