
import user_info_model from '../models/user-info'
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
}

export default {
    renderUserInfo
}