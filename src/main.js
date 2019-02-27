import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; 
import "tabler-ui/dist/assets/css/dashboard.css";
import "font-awesome/css/font-awesome.css";
axios.defaults.baseURL = 'https://html5zilla.com';

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} ;


Vue.config.productionTip = false;//阻止发布模式下产生警告
Vue.prototype.$http = axios;
Vue.prototype.$identify = window.identify;//当前用户
Vue.prototype.$entryId = window.entryId;//当前评论书本ID
Vue.prototype.$loginStatus = window.loginStatus;//当前用户登陆状体
Vue.prototype.$s3UrlHead = window.s3UrlHead;//s3头地址
Vue.prototype.$moment = require('moment');//时间转化函数

Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app');
