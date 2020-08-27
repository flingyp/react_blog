let ipUrl = 'http://127.0.0.1:7001/admin/'


let servicePath = {
    login: ipUrl + 'login', // 首页文章列表接口
    getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章分类接口
    addArticle: ipUrl + 'addArticle', // 添加文章接口
    updateArticle: ipUrl + 'updateArticle', // 更新文章接口
    getArticleList: ipUrl + 'getArticleList', // 获取文章列表接口
    delArticle: ipUrl + 'delArticle', // 删除文章接口
    getArticleById: ipUrl + 'getArticleById' // 根据文章ID获取详情信息
}

export default servicePath