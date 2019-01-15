var getMime = require("./modal/getMime");
var url = require("url");
var path = require("path");
var fs = require("fs")


var http = require("http");
var httpServer = http.createServer(function (req, res) {
  // 拿到请求的地址
  let pathname = url.parse(req.url).pathname;
  // console.log(url.parse(req.url, true))
  if (pathname == "/") { //默认加载首页
    pathname = "index.html";
  }

  if (pathname != "/favicon.ico") {
    // 读取文件
    fs.readFile("static/" + pathname, function (err, data) {
      // 没有这个文件展示404页面
      if (err) {
        fs.readFile("static/404.html", function (err, data404) {
          res.writeHead(404, { "Content-Type": "text/html;charset='utf-8'" });
          res.write(data404);
          res.end();
        })
        return
      }
      // 如果有就返回这个文件,根据文件类型获取对应的mime类型
      let extname = path.extname(pathname);
      getMime.getMime(fs, extname, function (mime) {
        res.writeHead(200, { "Content-Type": mime + ";charset='utf-8'" });
        res.end(data);
      });
    })
  }

});

httpServer.listen(8888)