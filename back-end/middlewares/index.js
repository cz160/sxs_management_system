// 处理响应json格式内容的
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}


module.exports = {
    resApplicationJson
}