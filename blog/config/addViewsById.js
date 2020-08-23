import servicePath from './apiUrl' 
import axios from 'axios'

const addViewsById = async (id, view_count) => {  // 文章id, 文章当前浏览数量
    const result = await axios.post(servicePath.addViewsById + '/' + id, {
        view_count
    })
    console.log(result.data.message)
}


export default addViewsById