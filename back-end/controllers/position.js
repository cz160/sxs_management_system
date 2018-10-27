let position_model = require('../models/position');
//list控制器

//获取全部数据
const listall=async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data= await position_model.listall();
    res.render('position', { 
        code: 200, 
        data: JSON.stringify(_data) 
    })
}
//根据参数获取某一页数据
const list=async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data= await position_model.list(req.query);
    res.render('position', { 
        code: 200, 
        data: JSON.stringify(_data) 
    })
}
//添加职位
const save = async (req,res)=>{
    //接受到发送过来的数据 req.body,存入数据库
    // console.log(req.body);
    res.set('content-type','application/json; charset=utf8');
    let _data =await position_model.save(req.body);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
//删除职位
const remove = async(req,res)=>{
    res.set('content-type','application/json; charset=utf8');
    let _data =await position_model.remove(req.query);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
//根据id获取某一页数据
const listone = async (req,res)=>{
    res.set('content-type','application/json; charset=utf8');
    let _data = await position_model.listone(req.query);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
//更新某条数据
const update =async(req,res)=>{
    res.set('content-type','application/json; charset=utf8');
    let _data = await position_model.update(req.body);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
module.exports={
    listall,
    save,
    remove,
    listone,
    update,
    list
}