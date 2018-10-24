
//引入自定义事件工具
import bus from '../util/bus'
//引入职位列表页面
import position_list_template from '../views/position-list.html'
//引入新增职位页面
import position_save_template from '../views/position-save.html'
//引入职位信息数据
import position_model from '../models/position'
import qs from 'qs';
//list业务逻辑处理
const list = async (req, res, next) => { // 当路由切换进来的时候执行
    let html = template.render(position_list_template,{
        data: (await position_model.list() ).data
    })
    res.render(html)
    bindListEvent()   // 绑定事件
}

//list的事件绑定(通过发布订阅模式处理router无法再两个页面中使用的问题)
const bindListEvent = ()=>{
    //点击添加按钮切换路由
    $('.position-list #addbtn').on('click',function(){
        bus.emit('go','/position-save');
    })
}


//save的业务逻辑处理
const save = (req,res,next)=>{
    res.render(position_save_template);
    bindSaveEvent();
}
//save的事件绑定
const bindSaveEvent = ()=>{
    //点击返回列表
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position-list')
    })
    //当表单提交时
    $('.position-save #save-form').submit(async function(e){
        //清楚默认提交
        e.preventDefault?e.preventDefault():returnValue=false;
        //拿到form的数据
        let _params = qs.parse($(this).serialize());
        let result = await position_model.save(_params);
        if(result.status==200){
            alert('成功')
        }else{
            alert('失败')
        }
        
    })
}
export default{
    list,
    save
}
