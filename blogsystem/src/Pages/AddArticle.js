import React, {useState} from 'react'
import {Row,Col, Button, Select, DatePicker, Input} from 'antd'
import '../static/css/AddArticle.css'

const {Option} = Select
const {TextArea} = Input

function AddArticle() {
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large" 
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue="Sign Up" size="large">
                                <Option value="Sign Up">视频教程</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文字内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button className="zhancun-article" size="large">暂存文章</Button>
                            <Button className="fabu-article" type="primary" size="large">发布文章</Button>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"  
                                />
                            </div>
                        </Col>
                        <Col span={24}>
                            <TextArea 
                                rows={4}
                                placeholder="文章简介"
                            />
                            <div className="introduce-html"></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle