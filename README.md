# 个人博库项目搭建过程

## 01-项目整体结构

<img src="./imgs/个人博客项目整体结构.png" alt="项目整体结构" style="zoom:67%;" />

## 02-个人博客blog部分项目环境搭建

`blog`部分需要`SEO`操作，所以考虑使用` Next.js`框架然后配合 `Ant Desgin` 搭建博客页面
+ [Next.js官网](https://nextjs.frontendx.cn/)

> **用 `create-next-app` 快速搭建项目**

+ `npm install -g create-next-app`
+ `npx create-next-app blog`

> **项目部分文件结构简单介绍**
 
 + components文件夹: 专门放在组建
 + pages文件夹： 放置页面的，这里边的内容会自动生成路由，并在服务器端渲染，渲染好后进行数据同步。
 + static文件夹： 这个是静态文件夹，比如项目需要的图片、图标和静态资源都可以放到这里。

> **让Next支持CSS文件**

+ `npm install --save @zeit/next-css`

在 blog根目录下 新建一个 `next-config.js` 文件。是Next.js的总配置文件，加入下面的代码

```js
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

> **引入 Ant Design**

+ `npm install antd --save` 
+ 安装 `npm install babel-plugin-import` 
+ 在blog根目录下新建一个 .babelrc 文件 写入如下配置:

```js
{
    "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
    "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
        [
            "import",
            {
                "libraryName":"antd"
            }
        ]
    ]
}
```

> **测试**

先在 pages目录下， 新建一个 `_app.js`文件。关于这个文件是什么用的，查看[官网自定义<App>](https://nextjs.frontendx.cn/docs/#%E8%87%AA%E5%AE%9A%E4%B9%89%3Capp%3E)。 

引入 Ant Design 全局样式

```js
import App from 'next/app'
import 'antd/dist/antd.css'
export default App
```