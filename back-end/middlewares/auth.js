const jwt = require('jsonwebtoken')
const userSigninAuth = (req, res, next) => {
    try {
        //解密
        var decoded = jwt.verify(req.query.token, 'i love u'); 
        let _time =  (Date.now() / 1000) - decoded.iat
        let _expires = 30000
        if ( _time > _expires ) { //是否过期
            res.render('user', {
                code: 304,
                data: JSON.stringify({ msg: '登录过期，请重新登录' })
            })
        } else {  //将解密的信息存在req.token中
            req.token = decoded
            next()
        }        
    }catch(err) {  //无法解密
        res.render('user', {
            code: 403,
            data: JSON.stringify({ msg: '请登录后操作' })
        })
    }
}

module.exports = {
    userSigninAuth
}