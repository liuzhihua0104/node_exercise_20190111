var express = require("express");
var app = new express();


// 设置ejs模板引擎，不需要require引入，只需要npm install ejs --save安装
app.set("view engine", "ejs")

// ejs模板引擎默认是在当前文件夹查找views文件夹，如果想修改需要下面的代码
//设置模板的位置
// app.set("views",__dirname+"/muban");

// get传参 http://localhost:8888/index?id=123&name=22&rose=22
app.get("/index", function (req, res) {
  // console.log(__dirname)

  res.render("list", { msg: "ejs模板111" }, function (err, data) {
    if (err) {
      console.log(err);
      return
    }
    res.send(data) //可以不写回调，如果不写send页面出不来

  })
})

app.listen(8888, "localhost")
