//引入职位modul
import position_Model from '../models/position';
//引入admin模型
import user_Model from '../models/user-info';
const renderUserInfo = async () => {
    // 获取到用户信息,再去渲染
    let _result = await user_Model.getUserInfo()
    if(_result.status==200){
         // 渲染用户名
         $('.username').html(_result.data.username)
    }
    //点击退出回到登录页面
    $('#exit').click( async function () {
        localStorage.removeItem('token')
        window.location.href = "/system.html"
    })
    //总职位数(发送请求)
    renderPosition();
    renderUser();
}
//渲染总职位数
const renderPosition=async()=>{
    let _result = await position_Model.list();
    let total=_result.data.pageInfo.total
    //渲染总职位数
    $('#total-position').html(total);
}
//渲染总用户数
const renderUser=async()=>{
    let _result = await user_Model.getAllUserNum();
    let total = _result.data.num;
    //渲染总用户数
    $('#total-user').html(total);
}
export default {
    renderUserInfo
}