//获取用户信息
const getUserInfo = () => {
    return $.ajax({
        url: '/api/userInfo/info',
        data:{
            token:localStorage.getItem('token') || ''
        },
        success: (results) => {
            return results
        }
    })
}
//判断是否为登录状态
const isSignIn = ({token}) => {
    return $.ajax({
        url: '/api/userInfo/issignin',
        type:'GET',
        data:{ token },
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
const check = (auth)=>{
    return $.ajax({
        url:'/api/userInfo/check',
        data:{
            auth,
            token:localStorage.getItem('token') || ''
        },
        success:(results)=>{
            return results
        }
    })
}
export default {
    getUserInfo,
    isSignIn,
    getAllUserNum,
    check
}