var http = require("http");
var ejs = require("ejs");
var path = require("path");
var url = require("url");
var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017";


let number = 0;
var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;

  // 添加数据
  if (pathname == "/add.html") {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        console.log("连接mongodb数据库失败");
        return
      }

      var myDb = db.db("user");
      myDb.collection("dancer").insertOne({ "name": "rose" + number }, function (err, result) {
        if (err) {
          console.log("插入数据失败");
          return
        }

        res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
        res.end("insertOne_" + number + "_success");
        number++;
        db.close();
      })

    })
  }


  //查找数据
  if (pathname == "/list.html") {

    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) {
        console.log("查询数据连接mongodb失败");
        return;
      }

      var myDb = db.db("user");
      var result = myDb.collection("dancer").find({});
      // console.log(result)

      let list = [];

      // each的写法已经不用了
      // result.each(function (err, doc) {
      //   if (err) {
      //     console.log("result失败");
      //     return;
      //   }

      //   if (doc != null) {
      //     list.push(doc); //一条一条将数据插入到list数组中
      //   } else {
      //     // res.send({ list: list })
      //     console.log(list)
      //     db.close();
      //   }
      // })

      // 现在用的是forEach 写法，好像只有一个参数
      result.forEach(function (doc) {
        list.push(doc);
        console.log(list.length, "--------------------------")

      }, function (err) {
        // 遍历完成之后的回调
        if (err) {
          console.log("输出了err");
          return
        }

        console.log("遍历完成======================")
        console.log(list)
        db.close(); //关闭数据库

      })


    })
  }



}).listen(8889);