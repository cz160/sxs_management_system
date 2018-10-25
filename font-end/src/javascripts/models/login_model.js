//保存用户信息
const save = (data)=>{
    return $.ajax({
        url:'/api/user/save',
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
        url:'/api/user/find',
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