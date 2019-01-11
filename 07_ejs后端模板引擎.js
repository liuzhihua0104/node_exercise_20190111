var http = require("http");

var ejs = require("ejs");
var url = require("url");

var fs = require("fs");

var server = http.createServer(function (req, res) {

  var pathname = url.parse(req.url).pathname;
  if (pathname == "/") {
    pathname == "/index.html"
  }

  if (pathname == "/list.html") {
    let erpData = [];
    let dishData = [];

    fs.readFile("./query-erp-food.json", function (err, dataErp) {
      if (err) {
        console.log("读取err失败")
        return
      }

      erpData = JSON.parse(dataErp.toString()).data;
      console.log(erpData.length)

      fs.readFile("./dish.json", function (err, dataDish) {
        if (err) {
          console.log("读取dish失败");
          return
        }
        dishData = JSON.parse(dataDish.toString()).data.matched;

        //  两个数据对比


        erpData.map(function (item, index) {
          dishData.map(function (element, key) {
            if(item.eDishCode==element.eDishCode){
              console.log("一致",element.dishName)
              item.dishName=element.dishName;
            }
          })
        })


        // console.log(dishData.length)

        // console.log(erpData)
        let element="<h2> 使用ejs 模板引擎渲染解析标签需要使用 <%- %>  符号</h2>"

        res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" })
        ejs.renderFile("views/list.ejs", { erpData ,element}, function (err, data) {
          res.end(data)
        })

      })

    })




  }

}).listen(8888)