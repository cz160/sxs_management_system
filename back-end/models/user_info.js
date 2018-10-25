
const mongoose = require('../util/mongoose');

var User = mongoose.model('users', new mongoose.Schema({
    username: String,
    email: String,
    password: String
}));
//保存用户数据到数据中
const save = (body)=>{
    return new User({
        ...body
    }).save()
    .then((results) => {
        return results
    })
    .catch((err) => {
        return false;
    })
}
//查询数据库中是否存在本信息
const find = (body)=>{
    return User.find({'username':body.username,'password':body.password})
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