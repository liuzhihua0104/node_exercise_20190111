let express = require("express");
let app = new express();

app.use(express.static("public")); //配置静态文件

app.set("view engine", "ejs");//设置ejs引擎

app.get("/", function (req, res) {
  res.render("login")
})
app.get("/product", function (req, res) {
  res.render("product")
})
app.get("/productadd", function (req, res) {
  res.render("productadd")
})
app.get("/productedit", function (req, res) {
  res.render("productedit")
})
app.get("/productdelete", function (req, res) {
  // res.render("productdelete")
  res,send("productdelete")
})

app.listen(8888, "127.0.0.1")