import App from 'next/app'
import blogBackground from '../config/blogBackground'
import 'antd/dist/antd.css' // Ant Design 样式
import '../static/style/page/common.css' // 页面公共样式

export default class DefineApp extends App {
    componentDidMount() {
        blogBackground()
    }
}
