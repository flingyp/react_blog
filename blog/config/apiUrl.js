let ipUrl = "http://127.0.0.1:7001/default/";

let servicePath = {
  getArticleList: ipUrl + "getArticleList", // 首页文章列表接口
  getArticleById: ipUrl + "getArticleById", // 文章详情页内容接口， 接收文章id(acticle.id)值
  getTypeInfo: ipUrl + "getTypeInfo", // 获取首页头部类型数据接口
  getListById: ipUrl + "getListById", // 获取文章列表接口
  addViewsById: ipUrl + "addViewsById", // 更新文章浏览量
  goodArticleList: ipUrl + "goodArticleList", // 获取优秀文章
};

export default servicePath;
