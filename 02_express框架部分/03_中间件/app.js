let express = require("express");
let app = new express();

// session使用负载均衡
// 1、安装express-session 和connect-mongo模块

// 2、引入
let session = require("express-session");
let MongoStore = require("connect-mongo")(session);

// 3、配置存储session的mongodb数据库
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10000 }, //10s后失效
  store: new MongoStore({
    url: "mongodb://127.0.0.1:27017/student", //存储数据库的地址，会自动创建一个sessions的集合存储cookie数据
    touchAfter: 24 * 3600   //time period in seconds  通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
  })
}))



app.get("/", function (req, res) {
  if (req.session.userInfo) {
    res.send("您好" + req.session.userInfo + "欢迎回来！")
  } else {
    res.send("登录失败")
  }
})


app.get("/login", function (req, res) {
  req.session.userInfo = "loginSuccess";
  res.send("登录成功")
})


app.get("/loginOut", function (req, res) {
  // req.session.cookie.maxAge = 0;
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      return
    }
    res.send("退出成功！");
  });
})


app.listen(8888, "127.0.0.1")
