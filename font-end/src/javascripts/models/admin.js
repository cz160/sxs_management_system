//注册：请求保存用户的信息
const save = (data)=>{
    return $.ajax({
        url:'/api/user/signup',
        type:'post',
        data,
        success:(results)=>{
            return results;
        }
    })
}
//查询用户信息
const find = (data)=>{
    return $.ajax({
        url:'/api/user/signin',
        type:'post',
        data,
        success:(results)=>{
            return results;
        }
    })
}
export default{
    save,
    find
}