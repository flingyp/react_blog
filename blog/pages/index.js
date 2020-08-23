// 博客首页页面
import '../static/style/page/index.css'  // 首页样式
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Button, Spin, message } from 'antd';
import { FieldTimeOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import marked, { use } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import servicePath from '../config/apiUrl' // 数据接口地址

import addViewsById from '../config/addViewsById'  // 增加文章浏览量函数




const Home = (props) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  }); 


  const [ mylist , setMylist ] = useState(props.data.data)
  const [falgLoading, setFlagLoading] = useState(false) 
  const [page , setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  // 加载更多
  const loadingMore = async () => {
    let nextPage = page + 1
    setPage(nextPage)
    if(!falgLoading) {
      setFlagLoading(true)
      // 请求更多
      const nextArticleList = await axios({
        method: 'get',
        params: {  
          page: nextPage,   // 当前页数
          limit: limit  // 显示文章条数
        },
        url: servicePath.getArticleList, 
        header:{ 'Access-Control-Allow-Origin':'*' },
        withCredentials: true
      })
      if(nextArticleList.data.data.length!=0) { 
        const newArticleList = [...mylist, ...nextArticleList.data.data]
        setMylist(newArticleList)
        setFlagLoading(false)
      } else { // 数据加载完毕 没有过多的数据
        setFlagLoading(false)
        message.info('地主家也没有过多的余粮了')
      }
    } else {
      setFlagLoading(false)
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/static/imgs/logo.ico" type="logo-ico" />
        <title>首页 | XiaoPeng记录每一天的点点滴滴</title>
      </Head>
      {/* 头部组件 */}
      <Header /> 
      <div className="index_img"></div>
      {/* 中间部分 */}
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical" 
              dataSource={mylist}
              renderItem={ item => (
                <List.Item>
                  <div className="list-title" onClick={() => {addViewsById(item.id, item.view_count)}}>
                    <Link prefetch href={{ pathname: '/detailed', query: {id: item.id}}}>
                      <a>{item.title}</a> 
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><FieldTimeOutlined />{item.addTime}</span>
                    <span><CalendarOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                  ></div> 
                </List.Item>
              )}
            />
          </div>
          <div className="loadMore" onClick={() => {loadingMore()}}>
            {
              falgLoading ? 
                <Spin tip="加载更多..." spinning={falgLoading}></Spin> 
              :
                <Button type="dashed" size="middle">加载更多</Button>
            }
          </div>
        </Col>
        <Col className="common-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      {/* 底部组件 */}
      <Footer />
    </>
  )
}

Home.getInitialProps = async()  => {
  const indexArticleData = await axios({
    method: 'get',
    params: {  
      page: 1,   // 当前页数
      limit: 5  // 显示文章条数
    },
    url: servicePath.getArticleList, 
    header:{ 'Access-Control-Allow-Origin':'*' },
    withCredentials: true
  })
  return {
    data: indexArticleData.data
  }
}

export default Home