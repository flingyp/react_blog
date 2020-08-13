import React, {useState, useEffect} from 'react'
import {List, Row, Col, Modal, Button, Switch} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleLisst.css'

const {confirm} = Modal

function ArticleList(props) {
    const [list, setList] = useState([])

    const getList = async () => {
        const result = await axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        console.log(result)
        if(result.data.data === '请重新登录' || result.data.data === '没有登录') {
            props.history.push('/login')
        } else {
            setList(result.data.list)
        }
    }

    useEffect(()=> {
        getList()
    }, [])

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={3}>
                            <b>序号</b>
                        </Col>
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>文章类型</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem= {item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={3}>
                                {item.id}
                            </Col>
                            <Col span={8} className="list-title">
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary">修改</Button>&nbsp;
                                <Button>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}


export default ArticleList