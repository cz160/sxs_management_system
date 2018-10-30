import user_model from '../models/user-info'
// 返回用户登录状态
const userSigninState = async () => {
    let _token = localStorage.getItem('token')||'';
    let isSignIn =  await user_model.isSignIn({
        token:_token
    })
    return !!(isSignIn.status ==200)
}
export {
    userSigninState
}