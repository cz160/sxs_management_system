const user_model = require('../models/user')

const getUserInfo = async(req,res,next)=>{
    //验证用户是否登录
    if(req.session.userinfo.userid){
        //通过id获取到用户信息
        let user_Info =await user_model.getUserInfoById(req.session.userinfo.userid);
        res.render('user',{
            code: 200,
            data: JSON.stringify(user_Info)
        })
    }else{
        res.render('user', ({
            code: 201,
            data: JSON.stringify({
                msg: '登陆后获取'
            })
        }))
    }
}
const exit = (req,res,next)=>{
    //清楚session(用户标识)
    req.session.userinfo = null
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            msg: '退出成功'
        })
    })
}
const isSignIn = (req, res,next) => {
    let _isSignIn = !!req.session.userinfo
    res.render('user', {
        code: _isSignIn ? 200 : 201, data: JSON.stringify({ msg: _isSignIn ? '已经登录' : '未登录' })
    })
}
const getAlluser = async(req,res,next)=>{
    let result = await user_model.getAlluser();
    res.render('user',{
        code:200,
        data:JSON.stringify({num:result})
    })
}
module.exports = {
    getUserInfo,
    exit,
    isSignIn,
    getAlluser
}