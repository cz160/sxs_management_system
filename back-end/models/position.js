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
//listall接口：返回这个集合中的所有数据
const listall = (query) => {
    let _query = query || {} // 查询的约定条件
    return Position.find(_query)
        .sort({
            createTime: -1
        })
        .then((results) => {
            return results;
        }).catch((err) => {
            return false;
        })
}
//list接口：返回某一页（部分）的数据
const list = async ({
    pageNo = 1,
    pageSize = 10,
    keyword = ''
}) => {
    //搜索关键字
    let re = new RegExp(keyword, 'g');
    //查询条件
    let _query = {
        $or:[
            {companyName: re },
            {positionName: re},
            {city: re}
        ]
    }
//查询总数据数
let all_item = await listall(_query);
return Position.find(_query)
    .sort({
        createTime: -1
    })
    .skip((pageNo - 1) * pageSize) //从哪里开始
    .limit(~~pageSize) //截取多少条
    .then((results) => {
        return {
            items: results,
            pageInfo: {
                pageNo, //当前是第几页
                pageSize, //每页多少条数据
                total: all_item.length, //总数据长度
                totalPage: Math.ceil(all_item.length / pageSize) //总页数
            }
        }
    }).catch((err) => {
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
const remove = async ({id}) => {
    //根据id删除某条数据
    let _row = await listone({
        id
    })
    return Position.deleteOne({
        _id: id
    }).
    then((results) => {
        results.deleteId = id;
        //点击删除这条数据后，删除保存的图片
        if (_row.companyLogo) {
            fs.removeSync(PATH.resolve(__dirname, '../public' + _row.companyLogo));
        }
        return results;
    }).
    catch((err) => {
        return false;
    })
}
//listone接口数据（根据id获取某一页数据）
const listone = ({
    id
}) => {
    return Position.findById(id).
    then((results) => {
        return results;
    }).catch((err) => {
        return false;
    })
}
//update接口数据
const update = (body) => {
    //如果不修改图片那么继续为未修改前的图片
    if (!body.companyLogo) delete body.companyLogo
    //当修改图片后，从问价中删除上一张图片
    if (body.old_img) {
        fs.removeSync(PATH.resolve(__dirname, '../public' + body.old_img));
    }
    console.log(body);
    //如果选了重新发布
    if (body.republish) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return Position.updateOne({
        _id: body.id
    }, { ...body
    }).
    then((results) => {
        return results;
    }).catch((err) => {
        return false;
    })
}
module.exports = {
    listall,
    save,
    remove,
    listone,
    update,
    list
}