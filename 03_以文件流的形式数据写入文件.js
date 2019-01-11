var fs = require("fs");
var data = '{ "id": 1, "name": "rose01" }'; // 我自己测试了下是覆盖式的写入，也可以写入普通的字符串
var writeStream = fs.createWriteStream("我是被写入的文件.json");

writeStream.write(data, "utf-8");

// 标记写入完成
writeStream.end();


// 广播写入完成事件
writeStream.on("finish", function () {
  console.log("写入完成")
})

// 广播写入失败事件
writeStream.on("error", function (err) {
  console.log(err);
  console.log("写入失败")
})