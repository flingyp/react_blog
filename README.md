# 🚀🚀🚀 个人博客 

## 🧑 简介

### [体验](http://114.55.102.231:81/)

个人博客分一共三大部分。 blog部分用于博客的展示、 blogsystem部分是博客后台管理系统用于管理博客文章、 server部分则是为博客的后端。


+ **Blog部分** 通过主要通过Next.js 配合 ReactHooks搭建。

+ **Blogsystem部分** 则是个单页面系统所以是通过 ReactHooks来搭建。

+ **Server部分** 通过阿里的 Egg.js框架 + MySql数据库来搭建后端内容。


## 😀 项目本地运行

前提： 确保本地电脑安装了MySQL、Node

```shell
# clone the projects
git clone https://github.com/flingyp/react_blog 

# enter the projects directories
cd blog、 cd blogsystem 、cd server

# install dependency
npm install

# develop
  # blog   runnning on port 3000
    npm run dev
  # blogsystem  runnning on port 3001
    npm start
  # server  runnning on port 7001
    npm run dev
```

## 🏘️🏘️ Build

```shell
# blog 部署服务器通过 PM2守护
npm run buildcl
pm2 start npm --name blog -- run start


# blogsystem 部署服务器通过 Nginx 实现
npm run build # 打包后，放在Nginx上


# server 部署服务器通过 PM2 守护
pm2 start npm --name blog-server -- run dev
```


## 开发过程遇到的问题

### 1. 代码提交到Github上 blog 文件夹的图标出现个箭头然后点不开的情况 

+ 原因： blog文件夹有子仓库

+ 解决方法：删除本地blog里的子仓库.git文件， 然后用 `git rm --cached repo(那个链接仓库的子文件夹的名字)`命令删除缓存后。重新上传到github上。 


### 2. 解决前端、后端跨域问题

+ 安装使用 egg-cors 解决开源问题

+ 在 后端server 中的config/plugin.js 文件 开启 egg-cors 写入如下代码:

```js
exports.cors: {
    enable: true,
    package: 'egg-cors'
}
```

+ 在 config/default.plugin.js文件 配置如下代码就完成了

```js
config.security = {
　csrf: {
　　enable: false
　},
　domainWhiteList: [ '*' ]
};
config.cors = {
  origin: '*',  // 填写需要跨域的前端地址
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};
```

### 3. 因为 blog、 blogsystem 都需要解决跨域问题 

+ 在配置跨域的网址时，只能配置 一个 config.cors, 如果配置了多个则后面的会覆盖前面的 config.cors。因为blog、blogsystem都需要配置跨域 但是 给 origin属性设置 为 '*' 也会出现问题必须配置具体的跨域地址。

+ 解决方法： 将 config.cors 的 orgin字段忽略 在 config.security 的 domainWhiteList 去配置

+ 注意： 项目上线时对应的也要修改

```js
config.security = {
  csrf: {
    enable: false
  },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
  }

  config.cors = {
  // 忽略 origin 字段， 可以在 domainWhiteList 配置多个跨域网址
  // origin: 'http://127.0.0.1:3001', 
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true // 允许cookie跨域
}
```





