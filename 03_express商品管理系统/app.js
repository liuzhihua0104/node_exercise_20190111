let express = require("express");
let app = new express();

let bodyParser = require("body-parser"); //使用bodyParser获取post提交的数据

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// 使用mongodb
let MongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017";

app.use(express.static("public")); //配置静态文件



// 路由
app.use(function (req, res, next) {
  // console.log(req.url);
  if (req.url == "/login" || req.url == "/dologin") {
    next();
  } else {
    if (req && req.session && req.session.username) { //检查有没有session登录信息
      // 设置ejs引擎公共值，不用每一个页面都传递用户名称
      console.log(33333333)
      app.locals["userinfo"] = req.session.username;
      next()
    } else {
      res.redirect("/login")
      next();
    }
  }

})


app.set("view engine", "ejs");//设置ejs引擎

app.get("/login", function (req, res) {
  res.render("login")
})

app.post("/dologin", function (req, res) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      res.send("连接数据库失败")
    } else {
      // res.send(req.body)
      // 查找数据
      var myDb = db.db("product");
      var result = myDb.collection("user").find(req.body);
      let list = [];

      // 第一种遍历的方法
      // result.forEach(function (doc) {
      //   list.push(doc);
      //   console.log(list.length + "=================")

      // }, function (err) {
      //   if (err) {
      //     console.log("遍历出问题了");
      //     return
      //   }
      //   if (list.length == 1) {
      //     // res.send(req.body)
      //     // res.send("登录成功！")
      //     res.json({ code: 200, data: list })
      //   } else {
      //     res.json({ code: 200, msg: "登录失败" })
      //   }

      // })


      // 第二种遍历的方法
      result.toArray(function (err, data) {
        if (err) {
          console.log("00000");
          return
        }
        if (data.length == 1) {
          console.log(11111)
          // res.json({ code: 200, data })
          res.redirect("/product") //登录成功跳转到product页面
        } else {
          // res.json({ code: 200, msg: "登录失败" })
          // 登录失败出弹框提示
          console.log(2222)
          res.send("<script>alert('登录失败！'); window.location.href='/'; </script>")
        }

      })
      db.close();
    }
  })

  // 拿到用户数据去数据库查询是否存在
})
app.get("/product", function (req, res) {
  console.log("product")
  res.render("product")
})
app.get("/productadd", function (req, res) {
  res.render("productadd")
})
app.get("/productedit", function (req, res) {
  res.render("productedit")
})
app.get("/productdelete", function (req, res) {
  // res.render("productdelete")
  res, send("productdelete")
})

app.listen(8888, "localhost")