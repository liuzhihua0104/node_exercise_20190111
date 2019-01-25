let express = require("express");
let app = new express();

let cookieParser = require("cookie-parser");

app.use(cookieParser("456"));
app.get("/", function (req, res) {
	// res.send(req.signedCookies.citys);
	res.send(req.signedCookies.citys || "no data");
})

app.get("/set", function (req, res) {
	let citys = req.signedCookies.citys;
	// console.log(citys)
	// 用户没有在路径中输入 ?luyou=城市字样，拿不到参数
	if (citys) {
		if (!req.query.luyou) {
			res.send("有去过的城市记录--路由中没有输入新的城市---" + citys);
			return
		} else {
			citys.push(req.query.luyou); //更新去过的城市
			res.cookie("citys", citys, { maxAge: 60000, signed: true }) //更新存储cookie
			res.send("有去过的城市记录--路由有输入新的城市" + citys)
		}
	} else {
		if (!req.query.luyou) {
			// citys = [];
			// res.cookie("citys", citys, { maxAge: 60000, signed: true }) //更新存储cookie
			res.send("ji有去过的城市记录，ye没有输入路由城市");
		} else {
			citys = [];
			citys.push(req.query.luyou)
			res.cookie("citys", citys, { maxAge: 60000, signed: true }) //更新存储cookie
			res.send("mei有去过的城市记录--路由有输入新的城市" + citys)
		}
	}


	// if (citys) {
	// 	citys.push(req.query.luyou)
	// } else {
	// 	citys = [];
	// 	// 防止没传参的时候拿到的是undefined,防止之前访问过了存储重复的数据
	// 	if (req.query.luyou) {
	// 		citys.push(req.query.luyou);
	// 	}
	// }

	// console.log(citys)

	// 用cookie存储起来
	// res.cookie("citys", citys, { maxAge: 60000, signed: true });
	// res.send("要去的城市为：" + req.query.luyou)
})

app.listen(8888, "localhost")