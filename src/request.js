/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 13:53:16
 * @LastEditTime: 2019-09-06 14:44:44
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

//全局默认配置
axios.defaults.baseURL = process.env.BASE_URL //1.baseURL
axios.defaults.timeout = 10000 //2.设置请求超时
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' //为POST设置请求头
axios.defaults.withCredentials = true;//表示跨域请求时是否需要使用凭证

//自定义配置
export default function request(url,type='GET',data={}){
    return new Promise((resolve,reject)=>{
        let option = {
            url,
            method:type
        }
        if(type.toLocaleLowerCase() ==='get'){
            option.params = data
        }else {
            option.data = qs.stringify(data)
        }
        axios(option).then(res=>{
            if(res.data.status === 'ok'){
                resolve(res.data)
            }else {
                Message.error(res.data.msg)
                reject(res.data)
            }
           
        })
        .catch(err=>{
            Message.error('xx异常')
            reject({msg:'xx异常'})
        })
            
        
    })
}