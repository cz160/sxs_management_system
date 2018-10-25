let user_model = require('../models/user_info');

const save = async(req,res)=>{
    res.set('content-type','application/json; charset=utf8');
    let _data =await user_model.save(req.body);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
const find = async (req,res) =>{
    res.set('content-type','application/json; charset=utf8');
    let _data =await user_model.find(req.body);
    res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}
module.exports={
    save,
    find
}