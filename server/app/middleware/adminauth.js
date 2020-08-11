const jwt = require('jsonwebtoken')
module.exports = options => {
    return async function adminauth(ctx, next) {
        let str = ctx.request.header.cookie
        let openIdName = str.indexOf('openId')
        if(openIdName!= '-1') {
            let openId = str.split(';')[2].split('=')[1]
            try {
                let decoded = jwt.verify(openId, 'secret');
                if(decoded.username === 'yyblog') {
                    await next()
                } else {
                    ctx.body = {
                        data: '没有登录'
                    }
                }
            } catch (error) {
                ctx.body = {
                    data: '请重新登录'
                }
            }
        }else {
            ctx.body = {
                data: '没有登录'
            }
        }
    }
}