
//引入自定义事件工具
import bus from '../util/bus'
//引入职位列表页面
import position_list_template from '../views/position-list.html'
//引入新增职位页面
import position_save_template from '../views/position-save.html'
//引入修改职位页面
import position_update_template from '../views/position-update.html';
//引入职位信息数据
import position_model from '../models/position'
//list业务逻辑处理
const list = async (req, res, next) => { // 当路由切换进来的时候执行
    req.query = req.query || {}  //防止没有参数时，req.query为null
    let _page = { //页面信息，当点击了分页器按钮后，页面的url改变，list控制器重新执行,重新获取数据渲染
        pageNo: req.query.pageNo||1,
        pageSize: req.query.pageSize||10,
        keyword:req.query.keyword||''
    }
    let _data =await position_model.list(_page);
    let html = template.render(position_list_template,{
        data: _data.data
    })
    res.render(html)
    bindListEvent(_page)   // 绑定事件
    //显示搜素关键字
    $('.position-list #keywords').val(_page.keyword)
}

//list的事件绑定(通过发布订阅模式处理router无法再两个页面中使用的问题)
const bindListEvent = (_page)=>{
    //点击添加按钮切换路由
    $('.position-list #addbtn').on('click',function(){
        bus.emit('go','/position-save');
    })
    //点击修改
    $('.position-list .pos-update').on('click',function(){
        let id = $(this).parents('tr').data('id');
        bus.emit('go','/position-update',{ id });
    })
     //点击删除
     $('.pos-remove').on('click',function(){
        handleRemove.bind(this,_page)();
    });
    //点击搜索按钮
    $("#possearch").on('click',()=>{
        //搜索关键字
        let keyword= $('#keywords').val();
        let _params={
            keyword:keyword,
            pageNo:1
        }
        bus.emit('go',`/position-list?${$.param(_params)}`)
    })
}
//删除操作
const handleRemove= async function(_page){
    //获取到当前这条数据的id
    let id = $(this).parents('tr').data('id');
    //得到后端响应的数据
    let _data = await position_model.remove({id:id});
    //获取当前为第几页(并且当这是这一页的最后一个数据时要回到上一页)
    let trs = $('.position-list__tabel tr[data-id]');  //通过判断页面还有多少tr来判断是否为只有一个数据
    let _pageNo =trs.length>1?_page.pageNo:(_page.pageNo-(_page.pageNo>1?1:0));
    if(_data.status==200){
        bus.emit('go', '/position-list?pageNo='+_pageNo+'&_'+id+'&'+"keyword="+_page.keyword);
    }else{
        console.log("出现了不可预知的错误");
    }
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
    });
    let _isLoading = false;  //开关防止多次提交（等提交完成后才能再次提交）
    //当表单提交时
    $('.position-save #save-form').submit(async function(e){
        //清楚默认提交
        e.preventDefault?e.preventDefault():returnValue=false;
        if(_isLoading)return false;
        _isLoading = true;
        //拿到form的数据
        // let _params = qs.parse($(this).serialize());
        let result = await position_model.save();
        _isLoading=false;  //一次保存完成后打开开关
        if(result.status==200){
            alert('成功')
        }else{
            alert('失败')
        }
        
    })
}

//修改页面业务逻辑
const update =async (req,res)=>{ 
    let { id } = req.body //要进行更新这条数据的id
    let html = template.render(position_update_template,{
        data: (await position_model.listone({ id })).data  //根据id获取到某一页数据
    });
    res.render(html);
    bindUpdateEvent();
}
//绑定修改时间
const bindUpdateEvent =()=>{
    //点击返回按钮
    $('.position-update #back').on('click', function () {
        bus.emit('go', '/position-list')
    });
    //提交表单
    $('.position-update #update-form').submit(async function(e){
        //阻止默认提交
        e.preventDefault?e.preventDefault():returnValue=false;
        //获取当前表单的所有数据(id是通过隐藏表单传入)
        // let _data = qs.parse($(this).serialize());
        let _result = await position_model.update();
        if(_result.status==200){
            alert('修改成功');
            bus.emit('go', '/position-list')
        }else{
            alert('修改失败');
        }
    })
}
export default{
    list,
    save,
    update 
}
