
const getUserInfo = () => {
    return $.ajax({
        url: '/api/userInfo/info',
        success: (results) => {
            return results
        }
    })
}
const exit = () => {
    return $.ajax({
        url: '/api/userInfo/exit',
        success: (results) => {
            return results
        }
    })
}

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