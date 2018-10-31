const mongoose = require('../util/mongoose')
//链接用户集合
var UserModel =  mongoose.model('users');
//通过id返回数据
const getUserInfoById = (id)=>{
    return UserModel.find({_id:id})
                    .then((results)=>{
                        return results[0];
                    }).catch((err)=>{
                        return false;
                    })
}
//返回所有注册的用户数
const getAlluser = ()=>{
    return UserModel.find({})
                    .then((results)=>{
                        return results.length;
                    }).catch((err)=>{
                        return false;
                    })
}
//权限数据
const auths = ()=>{
    return {
        '/map':6,
    }
}
module.exports ={
    getUserInfoById,
    getAlluser,
    auths
}