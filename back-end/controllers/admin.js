let user_model = require('../models/admin');
let jwt = require('jsonwebtoken');
//注册
const signup = async(req,res,next)=>{
    res.set('content-type','application/json; charset=utf8');
    //先判断有没有这个用户
    let _judge_result = await user_model.find(req.body.username);
    //如果没有这个用户
    if(!_judge_result.length){
        //注册并存入数据库中
        let _data =await user_model.save(req.body);
        res.render('admin',{
            code:200,
            data:JSON.stringify(_data)
        })
    }else{ //如果有这个用户
        res.render('admin',{
            code:201,
            data:JSON.stringify("用户名已存在")
        })
    }
    
}
//登录
const signin = async (req,res,next) =>{
    res.set('content-type','application/json; charset=utf8');
    //先判断这个用户是否存在
    let  _judge_result = await user_model.find(req.body.username);
    if(!!_judge_result.length){
        //验证密码是否匹配
        let _data = await user_model.signin(req.body.password,_judge_result[0]);
        //登录成功
        if(_data){
            //使用token(对称加密)
            let _payload = { //要加密的数据
                userid:_judge_result[0]._id,
                username:_judge_result[0].username,
                auth:3
            }
            let _cert = 'i love u'  //密钥
            var _token = jwt.sign(_payload,_cert);
            res.render('admin',{
                code:200,
                data:JSON.stringify({
                    token:_token
                })
            })
        }else{
            res.render('admin',{
                code:203,
                data:JSON.stringify("密码错误")
            })
        }
    }else{ //用户不存在
        res.render('admin', {
            code: 202,
            data: JSON.stringify('用户名不存在')
        })
    }
}
module.exports={
    signup,
    signin
}