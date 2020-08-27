const jwt = require('jsonwebtoken')
const setUser = require('../../config/setUser')
module.exports = options => {
    return async function adminauth(ctx, next) {
        const openId = ctx.cookies.get('openId', {
            httpOnly: false,
            signed: false,
            maxAge: 1000 * 3600 * 2, // cookie有效期为两个小时
        });
        console.log(openId)
        try {
            let decoded = jwt.verify(openId, 'secret');
            if (decoded.username === `${setUser}`) {
                console.log(decoded.username)
                await next()
            } else {
                ctx.body = { // 这里代表 token 过期
                    data: '请重新登录'
                }
            }
        } catch (error) {
            ctx.body = {
                data: '请重新登录'
            }
        }
    }
}