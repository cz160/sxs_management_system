//获取用户信息
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
//判断是否为登录状态
const isSignIn = () => {
    return $.ajax({
        url: '/api/userInfo/issignin',
        success: (results) => {
            return results
        }
    })
}

export default {
    getUserInfo,
    exit,
    isSignIn
}