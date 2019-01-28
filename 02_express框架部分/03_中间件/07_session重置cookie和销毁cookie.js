let express = require('express');
let session = require("express-session");
let app = new express();


app.use(session({
  secret: "keyboard",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 5000 },//设置过期时间，不再执行关闭浏览器cookie自动失效
  rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))



app.get("/", function (req, res) {
  if (req.session.userInfo) {
    res.send("欢迎回来" + req.session.userInfo);
  } else {
    res.send("登录失败");
  }
  // res.send(req.session.userInfo);
})

app.get("/login", function (req, res) {
  req.session.userInfo = "loginSuccess!";
  res.send("登录成功")
})


// 清除session
app.get("/loginOut", function (req, res) {
  //重新设置 cookie 的过期时间
  // req.session.userInfo.maxAge = 0;

  req.session.destroy(function (err) { /*销毁 session*/
    if (err) {
      console.log(err);
      return
    }

    res.send("退出成功！")
  })

  // res.redirect("/"); //回到首页


})





app.listen(8888, "127.0.0.1");