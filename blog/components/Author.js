import '../static/style/components/author.css'
import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';


const Author = () => {
    return (
        <div className="author-div common-box">
            <div> 
                <Avatar size={100} src="https://tse1-mm.cn.bing.net/th/id/OIP.uKcXMiwIIUy4xkgtEto6kAAAAA?w=312&h=176&c=7&o=5&pid=1.7"  />
            </div>
            <div className="author-introduction">
                专注于WEB和移动前端开发。个人技术博客:yyblog.top/vuepress
                <Divider>社交账号</Divider>
                <Avatar size={30} icon={<GithubOutlined />} className="account"  />
                <Avatar size={30} icon={<QqOutlined />}  className="account" />
                <Avatar size={30} icon={<WechatOutlined />}  className="account"  />
            </div>
        </div>
    )
}

export default Author