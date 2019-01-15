var express = require("express");
var app = new express();

// get传参 http://localhost:8888/index?id=123&name=22&rose=22
app.get("/index", function (req, res) {
  console.log(req.query) //输出{ id: '123', name: '"rose"' }类型

  res.json(req.query)
})

app.listen(8888, "localhost")