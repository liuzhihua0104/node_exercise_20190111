var fs=require("fs");

// 文件比较大时可以使用下面的方法读取文件，而不用readFile
var readStream=fs.createReadStream("01_fs检测文件夹是否存在.js");

var str="";
var num=0;
// 读取到文件
readStream.on("data",function(chunk){
num=num++;
str+=chunk
})


// 读取文件完成，广播end事件
readStream.on("end",function(chunk){
  console.log(str);
  console.log("读取完成")
})


// 读取文件失败，
readStream.on("errors",function(error){
  console.log(error);
  console.log("读取失败")
})
