import React , {useState} from 'react'
import { Card, Input, Button, Spin, notification,message } from 'antd';
import { UserOutlined ,LockOutlined,SearchOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../static/css/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const checkLogin = async () => { // 点击登录时执行的方法
        setLoading(true)
        setTimeout(async () => {
            if(userName=='' || password =='') {
                notification.warn({
                    message: '友情提示',
                    description:
                        '用户名或密码不能为空!!!',
                    duration: 2,
                    placement: 'topLeft'
                });
                setLoading(false)
                return
            }
            const result = await axios.post(servicePath.login, {
                username: userName,
                password: password
            })
            if(result.data.message === '登录成功') {
                document.cookie = `openId=${result.data.openId}`
                props.history.push('/index')
            } else {
                message.error('用户名或密码错误');
            }
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="login-div">
            <Spin tip="登录中..." spinning={loading}>
                <Card title="博客管理系统"  hoverable={true} bordered={true} style={{ width: 450 }} >
                    <Input 
                        id="userName"
                        size="large" 
                        placeholder="请输入账号:" 
                        prefix={<UserOutlined />}
                        onChange={ (e) => {setUserName(e.target.value)}} 
                    />
                    <br />
                    <br />
                    <Input.Password
                        id="password"
                        placeholder="请输入密码:"
                        size="large" 
                        prefix={<LockOutlined /> }
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={ (e) => {setPassword(e.target.value)}} 
                    />
                    <br/>
                    <br/>
                    <Button 
                        type="primary" 
                        size="large" 
                        block 
                        icon={<SearchOutlined />} 
                        onClick={checkLogin}>
                            登录
                    </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login














