# 🚀🚀🚀 个人博客

## 🧑 简介

### [体验](http://114.55.102.231:81/)

个人博客分一共三大部分。 blog 部分用于博客的展示、 blogsystem 部分是博客后台管理系统用于管理博客文章、 server 部分则是为博客的后端。

- **Blog 部分** 通过主要通过 Next.js 配合 ReactHooks 搭建。

- **Blogsystem 部分** 则是个单页面系统所以是通过 ReactHooks 来搭建。

- **Server 部分** 通过阿里的 Egg.js 框架 + MySql 数据库来搭建后端内容。

## 😀 项目本地运行

前提： 确保本地电脑安装了 MySQL、Node

```mysql
type表（文章类型表）

id : 类型编号 int类型
typeName: 文章类型名称 varchar类型
orderNum: 类型排序编号 int类型

article表（文章内容表）

id : 文章编号 int类型
type_id : 文章类型编号 int类型
title : 文章标题，varchar类型
article_cointent : 文章主体内容，text类型
introduce： 文章简介，text类型
addTime : 文章发布时间，text类型
view_count ：浏览次数， int类型

blog_system表(用户表)

id: 用户id
username: 用户名
password: 用户密码
```

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

注意：

- blogsystem 后台管理系统在登录前， 在 MySQL blog_system 表添加一个用户。 并且在 server 的 config 文件夹下 setUser 文件去设置你配置的用户名。

- blog 部分的用户信息 请在 blog 的 config 文件夹下的 setUserInfo 文件 去配置

## 开发过程遇到的问题

### 1. 代码提交到 Github 上 blog 文件夹的图标出现个箭头然后点不开的情况

- 原因： blog 文件夹有子仓库

- 解决方法：删除本地 blog 里的子仓库.git 文件， 然后用 `git rm --cached repo(那个链接仓库的子文件夹的名字)`命令删除缓存后。重新上传到 github 上。

### 2. 解决前端、后端跨域问题

- 安装使用 egg-cors 解决开源问题

- 在 后端 server 中的 config/plugin.js 文件 开启 egg-cors 写入如下代码:

```js
exports.cors: {
    enable: true,
    package: 'egg-cors'
}
```

- 在 config/default.plugin.js 文件 配置如下代码就完成了

```js
config.security = {
  csrf: {
    enable: false,
  },
  domainWhiteList: ["*"],
};
config.cors = {
  origin: "*", // 填写需要跨域的前端地址
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
};
```

### 3. 因为 blog、 blogsystem 都需要解决跨域问题

- 在配置跨域的网址时，只能配置 一个 config.cors, 如果配置了多个则后面的会覆盖前面的 config.cors。因为 blog、blogsystem 都需要配置跨域 但是 给 origin 属性设置 为 '\*' 也会出现问题必须配置具体的跨域地址。

- 解决方法： 将 config.cors 的 orgin 字段忽略 在 config.security 的 domainWhiteList 去配置

- 注意： 项目上线时对应的也要修改

```js
config.security = {
  csrf: {
    enable: false,
  },
  domainWhiteList: ["http://127.0.0.1:3000", "http://127.0.0.1:3001"],
};

config.cors = {
  // 忽略 origin 字段， 可以在 domainWhiteList 配置多个跨域网址
  // origin: 'http://127.0.0.1:3001',
  allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  credentials: true, // 允许cookie跨域
};
```
