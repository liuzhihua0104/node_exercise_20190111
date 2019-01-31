let express = require("express");
let app = new express();

app.get("/", function (req, res) {
  res.send("login")
})
app.get("/product", function (req, res) {
  res.send("product")
})
app.get("/productadd", function (req, res) {
  res.send("productadd")
})
app.get("/productedit", function (req, res) {
  res.send("productedit")
})
app.get("/productdelete", function (req, res) {
  res.send("productdelete")
})

app.listen(8888, "127.0.0.1")