const URL = require('url')
const _none = () => {}
import user_model from '../models/user-info'

// 返回用户登录状态
const userSigninState = async () => {
    let _result = await user_model.isSignIn()
    // return !!URL.parse(window.location.href, true).query.ok
    return !!(_result.status === 200)
}

// 验证用户登录状态
const userSigninAuth = async (success = _none, fail = _none) => {
    let auth = await userSigninState()
    if ( auth ) {
        success(auth)
        return true;
    } else {
        fail()
        return false
    }
}
export {
    userSigninState,
    userSigninAuth
}
export default {
    userSigninState,
    userSigninAuth
}