import '../static/style/components/header.css' // Header组件样式
import { Row, Col, Menu } from 'antd'
import { BankOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={13}>
                <span className="header-logo">XiaoPeng</span>
                <span className="header-txt">专注前端开发，专注前端开发哦耶！</span>
            </Col>
            <Col xs={0} sm={0} md={14} lg={8} xl={5}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <BankOutlined /> 首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <YoutubeOutlined /> 视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        <SmileOutlined /> 生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)


export default Header