import React, {useState} from 'react'
import Head from 'next/head'
import { Row, Col, Menu, List, Icon } from 'antd';
import { FieldTimeOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import Header from '../components/Header'



const Home = () => {
  const [ mylist , setMylist ] = useState(
    [
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
      {title:'如何快速开发应该学会如何优雅的 Ctrl + C 和 Ctrl + V',context:'Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。Vue是一套用于构建用户界面的渐进式框架。个人太喜欢Vue相类似的些Logo了嘻嘻嘻。'},
    ]
  )
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
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
                    <span><FieldTimeOutlined />2019-06-28</span>
                    <span><CalendarOutlined />视频教程</span>
                    <span><FireOutlined />5498人</span>
                  </div>
                  <div className="list-context">{item.context}</div> 
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </>
  )
}

export default Home