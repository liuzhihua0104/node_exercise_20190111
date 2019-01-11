var fs=require("fs");

// 创建一个可读流
var reaadStream=fs.createReadStream("01_fs检测文件夹是否存在.js");

// 创建一个可写流
 var writeStream=fs.createWriteStream("我是创建的可写流.js")

//  将读取流中读取到的文件写入到可写流中, 用pipe方法
reaadStream.pipe(writeStream);
console.log("写入完成")