//链接数据库模块
const mongoose = require('../util/mongoose');
//事件戳处理模块
const Moment = require('moment');
const fs = require('fs-extra') 
const PATH = require('path') 

//创建一个集合positions
var Position = mongoose.model('positions', new mongoose.Schema({
    city: String,
    positionName: String,
    companyName: String,
    salary: String,
    createTime: String,
    formatTime: String,
    companyLogo: String
}));
//list接口
const list = () => {
    //返回这个集合中的所有字段
    return Position.find({}).sort({createTime:-1}).
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
const remove = async({ id })=>{
    //根据id删除某条数据
    let _row = await listone({ id })
    return Position.deleteOne({ _id: id }).
    then((results)=>{
        results.deleteId=id;
        //点击删除这条数据后，删除保存的图片
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.companyLogo))
        return results;
    }).
    catch((err) => {
        return false;
    })
}
//listone接口数据（根据id获取某一页数据）
const listone = ( { id } )=>{
    return Position.findById(id).
    then((results)=>{
        return results;
    }).catch((err)=>{
        return false;
    })
}
//update接口数据
const update = (body)=>{
    //如果选了重新发布
    if(body.republish){
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return Position.updateOne({_id:body.id},{...body}).
    then((results)=>{
        return results;
    }).catch((err)=>{
        return false;
    })
}
module.exports = {
    list,
    save,
    remove,
    listone,
    update
}