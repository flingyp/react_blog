// 博客首页页面
import '../static/style/page/index.css'  // 首页样式
import React, {useState} from 'react'
import Head from 'next/head'
import { Row, Col, List } from 'antd';
import { FieldTimeOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'


const Home = (props) => {
  
  const [ mylist , setMylist ] = useState(props.data.data)
  console.log(mylist)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* 头部组件 */}
      <Header /> 
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
                  <div className="list-title">{item.title}</div>
                  <div className="list-icon">
                    <span><FieldTimeOutlined />{item.addTime}</span>
                    <span><CalendarOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}人</span>
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
const baseUrl = 'http://127.0.0.1:7001'  
Home.getInitialProps = async()  => {
  const indexArticleData = await axios(`${baseUrl}/default/getArticleList`)
  return {
    data: indexArticleData.data
  }
}

export default Home