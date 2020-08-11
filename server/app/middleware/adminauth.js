module.exports = options => {
    return async function adminauth(ctx, next) {
        let str = ctx.request.header.cookie
        let openIdName = str.indexOf('openId')
        if(openIdName!= '-1') {
            let openId = str.split(';')[2].split('=')[1]
            if(openId) {
                await next()
            } else {
                ctx.body = {
                    data: '没有登录'
                }
            }
        }else {
            ctx.body = {
                data: '没有登录'
            }
        }
        
        // if(ctx.session.openId) {
        //     await next()
        // } else {
        //     ctx.body = {
        //         data: '没有登录'
        //     }
        // }
    }
}