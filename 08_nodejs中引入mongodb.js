var http = require("http");
var url = require("url");
var ejs = require("ejs");

// 1、安装mongodb;
// 2、引入mongodb下面的MongoClient
var MongoClient = require("mongodb").MongoClient;
// 3、定义数据库的连接地址；
var mongodbUrl = "mongodb://localhost:27017";
var dbName = "user";

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url, true).pathname;
    if (pathname == "/") {
        pathname = "/index.html"
    }

    // 进入首页展示ejs文件

    if (pathname == "/index.html") {
        let msg = "我是ejs渲染出来的文件1"
        ejs.renderFile("views/testMongo.ejs", { msg },
            function (err, data) {
                if (err) {
                    console.log(err);
                    return
                }
                res.end(data)
            })
    }

    // 新增数据

    if (pathname == "/add.html") {
        // 4、nodejs连接数据库
        MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function (err, client) {
            // res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>')
            if (err) {
                res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" })
                // res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>')
                res.end("err");
                return
            }
            res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" })
            // res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>')
            res.end("success")
        })
    }



}).listen(8888)