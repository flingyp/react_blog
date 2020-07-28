# 个人博库项目搭建过程

## 00-开发过程遇到的问题

> **遇到提交项目后 blog文件夹图标有个箭头然后点不开的问题**

原因： blog文件夹有子仓库
解决方法：删除本地blog里的子仓库.git文件， 然后用 `git rm --cached repo(那个链接仓库的子文件夹的名字)`命令删除缓存后。重新上传到github上。 

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

在 blog根目录下 新建一个 `next.config.js` 文件。是Next.js的总配置文件，加入下面的代码

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

## 03-Header组件的搭建

+ 创建 components/Header.js组件

考虑到 PC端 和 移动端的使用，所以使用 Ant Design 的 栅格 Grid 配合 rem来实现响应式。

+ 创建 static/style/commponents/header.css 样式 

在 Header组件引入这个样式

## 04-首页 中间部分 左右两列布局

博客是左右两列布局的，同时也要考虑适配不同设备的。依然使用栅格。

index.js 基础结构

```js
import React from 'react'
import Head from 'next/head'
import { Row, Col, Menu } from 'antd';
import Header from '../components/Header'

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <Row className="common-main" type="flex" justify="center">
      <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        左侧
      </Col>
      <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        右侧
      </Col>
  </Row>
 </>
)

export default Home
```

## 05-编写 首页中间部分基本结构 

+ 博客文章的渲染采用 Ant Design 的List列表组件渲染。

先伪造点假数据

```js
const [ mylist , setMylist ] = useState(
    [
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
    ]
  )
```

+ 然后通过 List列表组件来渲染这些数据

+ List组件CSS样式编写  /static/style/pages/index.css 

```css
.list-title{
    font-size:1.3rem;
    color: #1e90ff;
    padding: 0 0.5rem;
}
.list-context{
    color:#777;
    padding:.5rem;
}
.list-icon{
    padding:.5rem 0;
    color:#AAA;
}
.list-icon span{
    display: inline-block;
    padding: 0 10px;
}
```

## 06-编写右侧 Author 作者介绍组件

Author作者介绍组件 主要使用了 Ant Design 的头像Avatar组件和图标组件

引入样式 static/style/components/author.css 

```js
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div> 
                <Avatar size={100} src="https://tse1-mm.cn.bing.net/th/id/OIP.uKcXMiwIIUy4xkgtEto6kAAAAA?w=312&h=176&c=7&o=5&pid=1.7"  />
            </div>
            <div className="author-introduction">
                专注于WEB和移动前端开发。个人技术博客:yyblog.top/vuepress
                <Divider>社交账号</Divider>
                <Avatar size={30} icon={<GithubOutlined />} className="account"  />
                <Avatar size={30} icon={<QqOutlined />}  className="account" />
                <Avatar size={30} icon={<WechatOutlined />}  className="account"  />
            </div>
        </div>
    )
}
```

```css
.author-div{
    padding: 1rem;
    text-align: center;
}

.author-div div {
    margin: .5rem 0;
}

.author-introduction{
    font-size: .8rem;
    color: #999;
}

.account{
    background-color: #999;
    margin-left: .5rem;
    margin-right: .5rem;
    cursor: pointer;
}
```

## 07-编写 Advert广告组件

引入样式： static/style/components/advert.css

```js
const Advert = () => {
    return (
        <div className="ad-div common-box">
            <div>
                <img src="../static/imgs/test01.png" width="100%"></img>
            </div>
            <div>
                <img src="../static/imgs/test02.png" width="100%"></img>
            </div>
            <div>
                <img src="../static/imgs/test03.png" width="100%"></img>
            </div>
            <div>
                <img src="../static/imgs/test04.png" width="100%"></img>
            </div>
        </div>
    )
}
```

## 08-编写 Footer底部组件

引入样式： static/style/components/footer.css