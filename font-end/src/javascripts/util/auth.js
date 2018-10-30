import user_model from '../models/user-info'
// 返回用户登录状态
const userSigninState = async () => {
    let _result = await user_model.isSignIn()
    // return !!URL.parse(window.location.href, true).query.ok
    return !!(_result.status === 200)
}
export {
    userSigninState
}