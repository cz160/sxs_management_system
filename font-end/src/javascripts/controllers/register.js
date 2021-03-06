//注册部分业务逻辑
//点击叉叉回到登录页
import login_model from '../models/admin'
import qs from 'qs';
//点击叉叉回到登录页
const register = ()=>{
    $('.register_close').on('click', () => {
        $('#register').fadeOut('slow', function () {
            $('#login').fadeIn('slow')
        })
    })
    //注册表单提交
    $('#register_form').submit(async function (e) {
        e.preventDefault();
        //获得数据
        let _data = qs.parse($(this).serialize());
        let result = await login_model.save(_data);
        if(result.status==200){
            alert('注册成功');
            //触发点击事件回到登录页面
            $('.register_close').trigger('click');
        }else if(result.status==201){
            alert('用户名已经存在');
        }
    })
}

export default{
    register
}