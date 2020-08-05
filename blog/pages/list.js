// 博客列表页面
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd';
import { FieldTimeOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/page/list.css'

import servicePath from '../config/apiUrl'




const blogList = (props) => {
  const [ mylist , setMylist ] = useState([props.data.data])
  useEffect(()=> {
    setMylist(props.data.data)
  }, [])
  return (
    <>
      <Head>
        <title>List</title>
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
                    <Breadcrumb.Item>博客列表</Breadcrumb.Item>
                </Breadcrumb>
            </div>


            <List
              header={<div>最新日志</div>}
              itemLayout="vertical" 
              dataSource={mylist}
              renderItem={ item => (
                <List.Item>
                  <div className="list-title">
                    <Link prefetch href={{ pathname: '/detailed', query: {id: item.id}}}>
                      <a>{item.title}</a> 
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><FieldTimeOutlined />2019-06-28</span>
                    <span><CalendarOutlined />视频教程</span>
                    <span><FireOutlined />5498人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div> 
                </List.Item>
              )}
            />
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

blogList.getInitialProps = async({query})  => {
  let id = query.id
  const listArticleData = await axios(servicePath.getListById + '/' + id)
  return {
    data: listArticleData.data
  }
}

export default blogList