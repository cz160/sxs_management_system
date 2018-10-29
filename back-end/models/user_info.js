//引入链接数据库工具
const mongoose = require('../util/mongoose');
//引入加密工具
const bcrypt = require('bcrypt');
//创建一个集合
var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    email: String,
    password: String,
}));
//保存数据到数据库中，并对用户密码进行加密
const save = async({username,password,email})=>{
    //对密码进行加密
    var saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var _password = bcrypt.hashSync(password, salt);
    //存入数据库
    return new UserModel({
        username,
        password:_password,
        email
    }).save()
    .then((results) => {
        let {_id,username,email} = results;
        return {_id,username,email};
    })
    .catch((err) => {
        return false;
    })
}
//通过用户名验证是否存在这个用户
const find = (username)=>{
    return UserModel.find({username})
    .then((results)=>{
        return results
    })
    .catch((err)=>{
        return false;
    })
}
module.exports = {
    save,
    find
}