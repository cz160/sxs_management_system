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
//提供添加数据
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
//提供删除数据
const remove = (data)=>{
    return $.ajax({
        url:'/api/position/remove',
        data,
        success:(results)=>{
            return results;
        }
    })
}
//更具id获取某一条数据
const listone = (data)=>{
    return $.ajax({
        url:'/api/position/listone',
        data,
        success:(results)=>{
            return results
        }
    })
}
//更新某条数据
const update = (data)=>{
    return $.ajax({
        url:'/api/position/update',
        type:'post',
        data,
        success:(results)=>{
            return results;
        }
    })
}
export default{
    list,
    save,
    remove,
    listone,
    update
}