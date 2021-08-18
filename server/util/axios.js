// import axios from 'axios'
const axios=require("axios");

axios.defaults.baseURL=`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`


module.exports=axios