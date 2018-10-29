let user_model = require('../models/user_info');
//注册
const signup = async(req,res,next)=>{
    res.set('content-type','application/json; charset=utf8');
    //先判断有没有这个用户
    let _judge_result = await user_model.find(req.body.username);
    console.log(_judge_result);
    //如果没有这个用户
    if(!_judge_result.length){
        //注册并存入数据库中
        let _data =await user_model.save(req.body);
        res.render('user',{
            code:200,
            data:JSON.stringify(_data)
        })
    }else{ //如果有这个用户
        res.render('user',{
            code:201,
            data:JSON.stringify("用户名已存在")
        })
    }
    
}
//登录
const signin = async (req,res,next) =>{
    res.set('content-type','application/json; charset=utf8');
    let _data =await user_model.find(req.body.username);
    res.render('user',{
        code:200,
        data:JSON.stringify(_data)
    })
}
module.exports={
    signup,
    signin
}