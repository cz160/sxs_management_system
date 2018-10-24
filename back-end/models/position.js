//链接数据库模块
const mongoose = require('../util/mongoose');
//事件戳处理模块
const Moment = require('moment');

//创建一个集合positions
var Position = mongoose.model('positions', new mongoose.Schema({
    city: String,
    positionName: String,
    companyName: String,
    salary: String,
    createTime: String,
    formatTime: String
}));
//list接口
const list = () => {
    //返回这个集合中的所有字段
    return Position.find({}).
    then((results) => {
        return results;
    }).
    catch((err) => {
        return false;
    })
}
//save接口数据
const save = (body) => {
    let _timestamp = Date.now();
    let moment = Moment(_timestamp)
    return new Position({
            ...body,
            createTime: _timestamp,
            formatTime: moment.format("YYYY-MM-DD, hh:mm")
        }).save()
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false;
        })
}
//remove接口数据
const remove = (query)=>{
    let id = query._id;
    //根据id删除某条数据
    return Position.deleteOne({ _id: id }).
    then((results)=>{
        return results;
    }).
    catch((err) => {
        return false;
    })
}
module.exports = {
    list,
    save,
    remove
}