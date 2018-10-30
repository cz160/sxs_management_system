
import user_info_model from '../models/user-info'
//引入职位modul
import position_Model from '../models/position';
//引入admin模型
import user_Model from '../models/user-info';
const renderUserInfo = async () => {
    // 获取到用户信息
    let user_info = await user_info_model.getUserInfo()
    // 渲染用户名
    if ( user_info.status === 200 ) { // 已经登录了所以返回用户信息
        $('.username').html(user_info.data.username)
    } 
    //点击退出回到登录页面
    $('#exit').click( async function () {
        // 应该后端来进行退出
        let _result = await user_info_model.exit()
        if ( _result.status === 200 ) {
            window.location.href = "/system.html"
        }
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