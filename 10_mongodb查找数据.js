var http = require("http");
var ejs = require("ejs");
var path = require("path");
var url = require("url");
var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017";


let number = 0;
var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
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

}).listen(8889);