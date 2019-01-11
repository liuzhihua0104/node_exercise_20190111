var fs=require("fs");


fs.stat("./upload",function(err,stats){
  if(err){
    // 如果不存在就创建一个
    // console.log(err);
    fs.mkdir("./upload",function(error){
      if(error){
        console.log(error);
        return 
      }
      console.log("创建成功")

    })
    return 
  }
  console.log(stats.isDirectory()) // 判断是否是文件夹
  console.log(stats.isFile()) //判断是否是文件
})