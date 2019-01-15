var http = require("http");
var url = require("url");
var ejs = require("ejs");

// 1、安装mongodb;
// 2、引入mongodb下面的MongoClient
var MongoClient = require("mongodb").MongoClient;
// 3、定义数据库的连接地址；
var mongodbUrl = "mongodb://localhost:27017";
var dbName = "user";


let number = 0;
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

            // 5、操作数据库
            // let db = client.db(dbName); //数据库db对象
            MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function (err, db) {
                if (err) {
                    res.end("内部db失败");
                    return;
                }

                //尝试 3.0 写法 成功
                // const mydb = db.db('需要引用的数据库名');
                // mydb.collection(colleactionsName);
                let mydb = db.db("user");

                mydb.collection("teacher").insertOne({ "name": "张三" + number }, function (err, result) {
                    if (err) {
                        res.end("db fail");
                        return;
                    }
                    number++;
                    db.close();//关闭连接
                    console.log("=========================")
                    console.log(db.close)
                    console.log("=========================")
                    // console.log(db)
                    console.log("=========================")
                    console.log(result.result)
                    res.end("db已关闭")
                })
            })


            res.end("success")
        })
    }



}).listen(8888)