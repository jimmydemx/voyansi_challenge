<template>
<div>
  <Tutorial/>
  <NuxtLogo/>
  <P>123</P>
  <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>

<button @click="onClick">
click here
</button>

</div>
</template>

<script>
import axios from "axios"
// import NuxtLogo from '../components/NuxtLogo.vue'
export default {
//   components:{NuxtLogo}
data(){
return{
  value:true
}

},

  methods:{
    async onClick(){

      try{
        var data=await axios.get('http://localhost:3000/room')
       console.log(data)

     }catch(e){
        console.log('error')
      }

    }
  }

} 
</script>
