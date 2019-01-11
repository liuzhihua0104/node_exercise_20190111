var http = require("http");
var fs = require("fs");
var path = require("path");
var router=require("./modal/router")
console.log(router)


// 06_创建静态服务抽离路由.js 和05_创建静态服务.js的区别是抽离了路由
var server = http.createServer(function (req, res) {
  router.router(req,res,"./static")
}).listen(8888)

