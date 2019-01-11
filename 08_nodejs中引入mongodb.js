var http = require("http");
var url = require("url");

var MongoClient = require('mongodb').MongoClient;
var shujukuUrl = 'mongodb://localhost:27017/user'; //数据库的名称

let number = 2;

var server = http.createServer(function (req, res) {
  let pathname = url.parse(req.url).pathname;

  res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

  if (pathname == "/") {
    pathname = "/index.html"
    res.end(pathname)
  }


  if (pathname = "/add.html") { //新增
    MongoClient.connect(shujukuUrl, function (err, client) {
      if (err) {
        // res.end("数据库连接失败");
        console.log("数据库连接失败")
        return
      }
      res.write('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'); //防止中文乱码
      res.write("数据库已连接成功");
      console.log("数据库已连接成功")

      // 
      var db = client.db("user");
      number++;
      db.collection("teacher").insertOne({ "name": "杨丽香" + number }, function (err, result) {
        if (err) {
          res.write("数据写入数据库失败");
          console.log("数据写入失败")
          return
        }
        res.write("已成功插入一条数据！");
        // db.close();//关闭数据库
        res.end()

      })

              db.close();//关闭数据库

    })



  }




}).listen(8888)