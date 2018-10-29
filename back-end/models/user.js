const mongoose = require('../util/mongoose')
//链接用户集合
var UserModel =  mongoose.model('users');
//通过id返回数据
const getUserInfoById = (id)=>{
    return UserModel.find({_id:id})
                    .then((results)=>{
                        return results[0]
                    }).catch((err)=>{
                        return false;
                    })
}
module.exports ={
    getUserInfoById
}