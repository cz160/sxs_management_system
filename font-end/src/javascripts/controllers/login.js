import qs from 'qs';
import login_model from '../models/admin'
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
        let _result = await login_model.find(_data);
        //判断查询的的数据中是否存在匹配用户名与密码的数据
        switch(_result.status){
            case 203:alert("密码错误");break;
            case 202:alert("用户不存在");break;
            default:
                window.location.href="/#/home";
                break;
        }
    })
}
export default{
    login
}