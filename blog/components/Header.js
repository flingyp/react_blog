import '../static/style/components/header.css' // Header组件样式
import React , { useState, useEffect } from 'react'
import Router from 'next/router'
// import Link from 'next/link'
import { Row, Col, Menu } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import axios from 'axios'


import servicePath from '../config/apiUrl' 



const Header = () => {
    const [navArray, setNavArray] = useState([]) 

    useEffect(() => {
        const fetchData = async () => { // 调用该接口一次即可
            const result = await axios(servicePath.getTypeInfo)
            setNavArray(result.data.data)
        }

        fetchData()

    }, [])

    // 跳转到列表页
    const handleClick = (e) => {
        if(e.key == 1) { // 跳转到列表页 (文章)
            Router.push('/list?id=1')
        } else if(e.key == 2)  {   // 跳转到生活页面 (生活)
            Router.push('/list?id=2')
        } else if(e.key === 'home') { // 跳转到首页
            Router.push('/index')
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={13}>
                    <span className="header-logo">XiaoPeng</span>
                    <span className="header-txt">专注前端开发，专注前端开发哦耶！</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu 
                        mode="horizontal"
                        onClick={handleClick}
                    >
                        <Menu.Item key="home">
                            <BankOutlined /> 首页
                        </Menu.Item>
                        {
                            navArray.map(item => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}


export default Header