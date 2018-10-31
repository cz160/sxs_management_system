const user_model = require('../models/user')
const isSignIn = (req, res,next) => {
        //判断是否登录 对token解密
        res.render('user', {
            code:200,
            data:JSON.stringify({
                msg:"用户已登录"
            })
        })
}
// 返回用户信息
const getUserInfo= async (req, res) => {
    let _result = await user_model.getUserInfoById(req.token.userid)
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username
        })
    })

}
//查询权限
const check = async(req,res)=>{
    //需要的权限
   let auth = user_model.auths()[req.query.auth];
   //当前用户的权限
   let _canauth = req.token.auth;
   if(_canauth>=auth){
       res.render('user',{
           code:200,
           data:JSON.stringify({msg:"可以操作"})
       })
   }else{
        res.render('user',{
            code:304,
            data:JSON.stringify({msg:"权限不够"})
        })  
   }    
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
    isSignIn,
    check,
    getAlluser
}