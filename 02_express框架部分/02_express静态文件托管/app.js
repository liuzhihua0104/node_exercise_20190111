let express = require("express");
let app = new express();

//设置静态文件托管
app.use(express.static("static"));

//app.use('/static', express.static('public'));
// 现在，你就爱可以通过带有 “/static”(实际没有static文件夹)前缀的地址来访问 public 目录下
// 面的文件了。

app.get("/", function (req, res) {
    res.send("首页");
})

app.listen(8888, "localhost")

