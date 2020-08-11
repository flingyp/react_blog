import React, {useState, useEffect} from 'react'
import {Row,Col, Button, Select, DatePicker, Input} from 'antd'
import marked from 'marked'
import '../static/css/AddArticle.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const {Option} = Select
const {TextArea} = Input

function AddArticle(props) {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState(['所有文章']) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

    const renderer = marked.Renderer()
    marked.setOptions({
        renderer:  renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: false
    })

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = ''
        if(e.target.value != '') {  
            html = marked(e.target.value)
        } else {
            html = '预览内容'
        }
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = async () => {
        const result = await axios({
            method:'get',
            url: servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        })
        if(result.data.data === '没有登录') {
            props.history.push('/login')
        } else {
            setTypeInfo(result.data.data)
        }
    }

    useEffect(() => {
        getTypeInfo()
    }, [])

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
                            <Select defaultValue={typeInfo} size="large">
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.Id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent} 
                                onChange={changeContent}
                                onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                dangerouslySetInnerHTML={{__html: markdownContent}}
                            ></div>
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
                                value={introducemd}  
                                onChange={changeIntroduce} 
                                onPressEnter={changeIntroduce}
                            />
                            <div 
                                className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                            ></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle