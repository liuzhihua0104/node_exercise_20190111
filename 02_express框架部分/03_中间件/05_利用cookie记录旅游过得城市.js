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
	// 用户没有在路径中输入 ?luyou=城市字样，拿不到参数
	if (citys) {
		if (!req.query.luyou) {
			res.send("有去过的城市记录--路由中没有输入新的城市---" + citys);
			return
		} else {

			if (citys.indexOf(req.query.luyou) == -1) { //去重
				citys.push(req.query.luyou); //更新去过的城市
			}

			res.cookie("citys", citys, { maxAge: 60000, signed: true }) //更新存储cookie
			res.send("有去过的城市记录--路由有输入新的城市" + citys)
		}
	} else {
		if (!req.query.luyou) {
			res.send("ji有去过的城市记录，ye没有输入路由城市");
		} else {
			citys = [];
			citys.push(req.query.luyou)
			res.cookie("citys", citys, { maxAge: 60000, signed: true }) //更新存储cookie
			res.send("mei有去过的城市记录--路由有输入新的城市" + citys)
		}
	}
})

app.listen(8888, "localhost")