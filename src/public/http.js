import axios from 'axios'
const Myserverhttp={}
Myserverhttp.install =  (Vue)=>{
    axios.defaults.baseURL='http://localhost:8888/api/private/v1'
    // axios拦截器,发送请求前进行拦截
    axios.interceptors.request.use(function (config) {
        if(config.url !== 'login'){
          const AUTH_TOKEN=sessionStorage.getItem('token')
          config.headers['Authorization']= AUTH_TOKEN;
        }
        return config
      }, function (error) {
        return Promise.reject(error);
      });
        // 添加实例方法
        Vue.prototype.$http = axios
      }
export default Myserverhttp


