exports.getMime = function (fs, extname, callback) {
  //路径要以被哪个文件引入就以哪个文件为出发点
  fs.readFile("./modal/mime.json", function (err, data) {
    if (err) {
      console.log(err);
    }
    let mime = JSON.parse(data.toString())[extname];
    callback(mime)

  })


}

// exports.getMime1 = function (fs, extname) {
//   console.log("ceshidaochu1")
// }


// 另外一种导出方法
// module.exports = { getMime }

