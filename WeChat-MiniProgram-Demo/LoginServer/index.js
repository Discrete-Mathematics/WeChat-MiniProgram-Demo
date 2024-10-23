const express = require('express') 				// express框架
const bodyParser = require('body-parser')		// 解析客户端请求body中的内容,内部使用JSON编码处理,即bodyParser.json()
const request = require('request')				// request模块 -> 请求
const app = express()							
	
app.use(bodyParser.json())						

// 开发者信息
const wx = {
    appid:'',	// 填写你自己的appid
    secret:''	// 填写你自己的appidSecret
}

// 模拟数据库存放数据
var db = {
	user: {},		// userInfo
    session: {}		// 保存 openid 和session_key会话信息 
}

// 响应接口
app.post('/login', (req, res) => {
    // 注意：小程序端的appid必须使用真实账号，如果使用测试账号，会出现login code错误
    console.log('code: ' + req.body.code)
	// 接收code参数(req.body.code)
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
	request(url, (err, response, body) => {
		//	可以获取到 session_key(会话信息) 、 openid(用户唯一标识)
        // console.log('session: ' + body)
		//  上面的session信息是字符串数据，通过JSON.parse()转成js对象
        var session = JSON.parse(body)
		// console.log(session);
		// 将openid和session_key保存后响应token回去,openid是用户的唯一标识
        if(session.openid) {
			// 这里采用时间戳来生成token,实际开发则会使用比较成熟的方式获取token(ps:JWT),避免token过于简单被恶意伪造
            var token = 'token_' + new Date().getTime()
            db.session[token] = session
			console.log(db);
			// db.user来保存用户记录，相等于如有一个openid在其中则注册一个新用户,且每一个新用户都有一个state为1值;
            if(!db.user[session.openid]) {
                db.user[session.openid] = {
                    state: 1	// 成功登录即可获取
                }
            }
			console.log(db)
        }
			res.json({
				token: token
			})
    })
})

// 检查用户是否已经登录
app.get('/checklogin', (req, res) => {
    var session = db.session[req.query.token]
    console.log('checklogin: ', session)
    // 将用户是否已经登录的布尔值返回给客户端
    res.json({
        is_login: session !== undefined
    })
})

app.listen(3000, () => {
    console.log('server running...');
})
