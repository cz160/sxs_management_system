let position_model = require('../models/position');

//list控制器
const list=async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data= await position_model.list();
    res.render('position', { 
        code: 200, 
        data: JSON.stringify(_data) 
    })
}
//添加职位
const save = async (req,res)=>{
    //接受到发送过来的数据 req.body
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
    let _data =await position_model.remove(res.query);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
    console.log(res.query)
}
module.exports={
    list,
    save,
    remove
}