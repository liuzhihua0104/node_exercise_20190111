let express = require("express");

let app = new express();

app.use(express.static("public")); //暴露静态文件
app.set("view engine", "ejs") //配置ejs模板引擎，express中不需要引入


// 使用body-parser接收参数
let bodyParser = require("body-parser");
// 设置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 使用mongodb
let MongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017";

// 用session保存用户信息
let session = require("express-session");
// 配置body-parser中间件
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 30 },
  rolling: true
}))


// 
app.use(function (req, res, next) {
  if (req.url == "/login" || req.url == "/dologin") {
    next();
  } else {
    // 检查是否有session,
    if (req.session && req.session.userInfo && req.session.userInfo.name) {
      next()
    } else {
      res.redirect("/login");
    }
  }
})

app.get("/login", function (req, res) {
  res.render("login.ejs")
})

app.post("/dologin", function (req, res) {
  // console.log(req.body)//获取用户表单数据
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      res.send("连接数据库失败");
      return
    }

    // res.send("连接数据库成功");
    // 从数据库查找数据
    let myDb = db.db("product"); //要去哪个数据库中查询
    let result = myDb.collection("user").find(req.body); //要去数据库的哪个集合中查找，req.body是查询条件
    // let list = [];

    // 第一种遍历方法
    // result.forEach(function (doc) {
    //   list.push(doc);
    // }, function (err) {
    //   // 遍历完成的回调
    //   if (err) {
    //     console.log("遍历出了问题");
    //   }
    //   if (list.length == 1) {
    //     res.redirect("/product")
    //   } else {
    //     res.send("登录失败")
    //   }
    //   console.log(list)
    //   db.close();
    // })

    // 第二种遍历方法
    result.toArray(function (err, data) {
      if (data.length == 1) {
        req.session.userInfo = data[0];// 用session保存用户信息
        res.redirect("/product");
      } else {
        res.send("<script> location.href='/login'; alert('登录失败')</script>");
      }
    })
  })


})

app.get("/product", function (req, res) {
  res.render("product.ejs")
})

app.get("/productadd", function (req, res) {
  res.render("productadd.ejs");
});

// app.get("/productdelete", function (req, res) {
//   res.render("product.ejs")
// })
app.get("/productedit", function (req, res) {
  res.render("productedit.ejs")
})

app.listen(8888, "localhost")