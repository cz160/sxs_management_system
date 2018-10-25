import qs from 'qs';
import login_model from '../models/login_model'
const login = () => {
    //登录部分业务逻辑
    //点击去注册
    $('#go_res').on('click', function () {
        $('#login').fadeOut('slow', function () {
            $('#register').fadeIn('slow')
        })
    })
    //登录表单提交
    $('#login_form').submit(async function (e) {
        e.preventDefault();
        let _data =qs.parse($(this).serialize());
        let result = await login_model.find(_data);
        //判断查询的的数据中是否存在匹配用户名与密码的数据
        if(result.status==200 && result.data[0]){
            alert('登录成功');
            //将当前用户信息存入localStorage中
            let data = JSON.stringify(result.data[0])
            let storage = window.localStorage;
            storage.setItem("userInfo",data);
            location.href='http://localhost:9000/#/home';
        }else{
            alert('用户名或密码错误');
        }
    })
}
export default{
    login
}