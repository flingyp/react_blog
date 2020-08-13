// 博客详情页面
import React, {useState} from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd';
import { FieldTimeOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
// import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'
import '../static/style/page/detailed.css'

import servicePath from '../config/apiUrl' // 数据接口地址


const BlogList = (props) => {
  const stringData = props.data.data[0].article_content 

  const renderer = new marked.Renderer()

  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }


  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(stringData)

  


  return (
    <>
      <Head>
        <title>博客详细页面</title>
      </Head>
      {/* 头部组件 */}
      <Header /> 
      {/* 中间部分 */}
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
                <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/list">博客列表</a></Breadcrumb.Item>
                    <Breadcrumb.Item>XXXX</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div>
                <div className="detailed-title">
                  React个人博客实现开发-编写详情页面
                </div>

                <div className="list-icon center">
                    <span><FieldTimeOutlined />2019-06-28</span>
                    <span><CalendarOutlined />视频教程</span>
                    <span><FireOutlined />5498人</span>
                </div>

                <div 
                  className="detailed-content" 
                  dangerouslySetInnerHTML={{__html: html}}
                >
                </div>

             </div>
          </div>
        </Col>
        <Col className="common-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          {/* 文章导航 */}
          <Affix offsetTop={10}>
            <div className="detailed-nav common-box">
                <div className="nav-title">文章目录</div>
                <div className="toc-list">
                  {tocify && tocify.render()}
                </div>
            </div>
          </Affix>
        </Col>
      </Row>
      {/* 底部组件 */}
      <Footer />
    </>
  )
}
BlogList.getInitialProps = async ({query}) => {
  let id = query.id
  const res = await axios(servicePath.getArticleById + '/' + id)
  return {
    data: res.data
  }
}

export default BlogList