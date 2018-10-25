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
//提供保存数据
const save = ()=>{
    // return $.ajax({
    //     url:'api/position/save',
    //     type:'post',
    //     data,
    //     success:(results)=>{
    //         return results;
    //     }
    // })
    //使用jq.from插件（处理图片上传）
    return new Promise((resolve)=>{
        $('.position-save #save-form').ajaxSubmit({
            url:'/api/position/save',
            type:'POST',
            success:(results)=>{
                resolve(results)
            }
        })
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