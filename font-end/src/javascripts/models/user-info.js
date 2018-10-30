<<<<<<< HEAD
//获取用户信息
=======
//获得用户信息
>>>>>>> master
const getUserInfo = () => {
    return $.ajax({
        url: '/api/userInfo/info',
        success: (results) => {
            return results
        }
    })
}
//退出
const exit = () => {
    return $.ajax({
        url: '/api/userInfo/exit',
        success: (results) => {
            return results
        }
    })
}
<<<<<<< HEAD
//判断是否为登录状态
=======
//是否登录状态
>>>>>>> master
const isSignIn = () => {
    return $.ajax({
        url: '/api/userInfo/issignin',
        success: (results) => {
            return results
        }
    })
}
//获得总总用户数
const getAllUserNum = ()=>{
    return $.ajax({
        url:'/api/userInfo/all',
        success:(results)=>{
            return results;
        }
    })
}
export default {
    getUserInfo,
    exit,
    isSignIn,
    getAllUserNum
}