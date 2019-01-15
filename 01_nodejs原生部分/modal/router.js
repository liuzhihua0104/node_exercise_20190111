// 此文件只为06_创建静态服务抽离路由.js文件服务

var fs = require("fs");
var url = require("url");
var path = require("path");

// 封装获取mime类型的私有函数
function _getMime(extname,callback) {

  fs.readFile("./modal/mime.json",function(err,data){
    if(err){
      console.log("读取mime.json文件出错");
      return
    }

    callback && callback(JSON.parse(data.toString())[extname])

  })



}


exports.router = function (req, res, staticPath) {
  var pathname = url.parse(req.url, true).pathname;
  if (pathname == "/") {
    pathname = "/index.html"
  }


  if (pathname != "/favicon.ico") {

    // 根据路由读取静态文件中的文件
    console.log(pathname)
    fs.readFile(staticPath + pathname, function (err, data) {
      if (err) {
        //  没有这个页面
        fs.readFile(staticPath + "/404.html", function (error, data404) {
          if (error) {
            console.log(error);
            return
          }
          res.writeHead(404, { "Content-Type": "text/html;charset='utf-8" });
          res.end(data404)
        })

        return
      }

      // 返回对应的mime类型
      var extname = path.extname(pathname);

      _getMime(extname, function (resultmime) {
        console.log(resultmime)
        res.writeHead(200,{"Content-Type":resultmime+";charset='utf-8"});
        res.end(data)
      })

    })




  }
}