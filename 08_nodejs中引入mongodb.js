var http = require("http");
var url = require("url");
var ejs = require("ejs");
var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url, true).pathname;
    if (pathname == "/") {
        pathname = "/index.html"
    }

// 进入首页展示ejs文件

    if (pathname == "/index.html") {
        let msg = "我是ejs渲染出来的文件1"
        ejs.renderFile("views/testMongo.ejs", {msg},
        function (err, data) {
            if (err) {
                console.log(err);
                return
            }
            res.end(data)
        }

    )
    }


}).listen(8888)