let express = require("express");
let app = new express();

let bodyParser = require("body-parser"); //使用bodyParser获取post提交的数据

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// 使用mongodb
let MongoClient = require("mongodb").MongoClient;
let dbUrl = "mongodb://localhost:27017"

app.use(express.static("public")); //配置静态文件

app.set("view engine", "ejs");//设置ejs引擎

app.get("/", function (req, res) {
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
      result.forEach(function (doc) {
        list.push(doc);
        console.log(list.length + "=================")

      }, function (err) {
        if (err) {
          console.log("遍历出问题了");
          return
        }
        if (list.length == 1) {
          // res.send(req.body)
          // res.send("登录成功！")
          res.json({ code: 200, data: list })
        } else {
          res.json({ code: 200, msg: "登录失败" })
        }

      })

      db.close();
    }
  })

  // 拿到用户数据去数据库查询是否存在
})
app.get("/product", function (req, res) {
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

app.listen(8888, "127.0.0.1")