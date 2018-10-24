//提供职位列表信息
const list = ()=>{
    return $.ajax({
        url: '/api/position/list',
        success:(results) => {
           return results
        },
        error:(err)=>{
            console.log(err);
        }
    })
}
const save = (data)=>{
    return $.ajax({
        url:'api/position/save',
        type:'post',
        data,
        success:(results)=>{
            return results;
        }
    })
}
export default{
    list,
    save
}