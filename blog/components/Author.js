import '../static/style/components/author.css'
import { Avatar, Divider,Tooltip } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined, ShareAltOutlined  } from '@ant-design/icons';


const Author = () => {
    const gitHubSrc = 'https://github.com/flingyp'
    const yyblogVuepress = 'http://yyblog.top/vuepress'
    return (
        <div className="author-div common-box">
            <div> 
                <Avatar size={100} src="https://tse1-mm.cn.bing.net/th/id/OIP.uKcXMiwIIUy4xkgtEto6kAAAAA?w=312&h=176&c=7&o=5&pid=1.7"  />
            </div>
            <div className="author-introduction">
                专注于WEB和移动前端开发。个人技术博客:yyblog.top/vuepress
                <Divider>社交账号</Divider>
                <Tooltip placement="top" title={gitHubSrc}>
                    <a href={gitHubSrc} target="_blank">
                        <Avatar size={30} icon={<GithubOutlined />} className="account"  />
                    </a>
                </Tooltip>
                <Tooltip placement="top" title={yyblogVuepress}>
                    <a href={yyblogVuepress} target="_blank">
                        <Avatar size={30} icon={<ShareAltOutlined />} className="account"  />
                    </a>
                </Tooltip>
                <Tooltip placement="top" title={'QQ:1213563369'}>
                    <Avatar size={30} icon={<QqOutlined />}  className="account" />
                </Tooltip>
                <Tooltip placement="top" title={'WX:y13698081137'}>
                    <Avatar size={30} icon={<WechatOutlined />}  className="account"  />
                </Tooltip>
            </div>
        </div>
    )
}

export default Author