import React, {useState, useEffect} from 'react'
import {Row,Col, Button, Select, DatePicker, Input, message} from 'antd'
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
    const [typeInfo ,setTypeInfo] = useState(['请选择类型']) // 获取文章类别信息
    const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别


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

    const changeContent = (e) => {   // 改变文章内容
        setArticleContent(e.target.value)
        let html = ''
        if(e.target.value != '') {  
            html = marked(e.target.value)
        } else {
            html = '预览内容'
        }
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => { // 改变文章简介
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo = async () => {  // 获取文章类型数据
        const result = await axios({
            method:'get',
            url: servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        })
        if(result.data.data === '没有登录' || result.data.data === '请重新登录') {
            props.history.push('/login')
        } else {
            setTypeInfo(result.data.data)
        }
    }

    const saveArticle = async () => {   // 发布文章
        if(!articleTitle) {
            message.error('请输入博客标题')
            return false
        } else if(!selectedType) {
            message.error('必须选择文章类别')
            return false 
        } else if(!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if(!introducemd) {
            message.error('文件简介不能为空')
            return false 
        } else if(!showDate) {
            message.error('发布日期不能为空')
            return false 
        }
        let propsData = {}  // 添加文章需要传入的参数
        propsData.type_id = selectedType // 文章类型 代号 1 /2 /3
        propsData.title = articleTitle    // 文章标题
        propsData.article_content = articleContent // 文章内容
        propsData.introduce = introducemd  // 文章简介
        propsData.addTime = showDate   // 文章发布日期
        
        if(articleId === 0) {  // 新增的文章  articleId 等于 0 代表的是新添加的文章
            propsData.view_count = 0
            const result = await axios({
                method: 'post',
                url: servicePath.addArticle,
                data: propsData,
                withCredentials: true
            })
            // 添加文字成功后，把数据库该文章的 ID 返回回来，赋给 articleId，下次修改了这篇文章再发布就是不是添加一篇新文章了
            const newArrticleId = result.data.arrticleId
            setArticleId(newArrticleId) 
            if(result.data.isSuccess) {
                message.success('文章保存成功')
            } else {
                message.error('文章保存失败')
            }
        } else {
            // 新添加文章后如果我们再改动，再点击保存按钮就会又新增加一条记录，这并不是我们想要的，这时候应该是修改，而不是从新增加一条新的数据
            propsData.id = articleId
            const result = await axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: propsData,
                header:{ 'Access-Control-Allow-Origin':'*' },
                withCredentials: true
            })
            if(result.data.isSuccess) {
                message.success('文章保存成功')
            } else {
                message.error('文章保存失败')
            }
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
                                onChange={e => {setArticleTitle(e.target.value)}}
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large" 
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={(value) => {setSelectType(value)}}>
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
                            <Button className="fabu-article" type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(data,dataString) => setShowDate(dataString)}
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