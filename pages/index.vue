<template>
<div class="index">
  <NuxtLogo class="index-logo" />
  <span class="index-title">Register Your Room</span>
  <Rooms/>
  <!-- <P>123</P> -->
  <!-- <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
  
</el-switch>
<p>{{this.$config}}</p>
<button @click="onClick">
click here
</button> -->

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
  },
  mounted(){

    console.log("process.env.MONGOLAB_URI",process.env.MONGOLAB_URI)
  }

} 
</script>

<style lang="scss">

.index{

background: floralwhite;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #ffffff, #fffc00);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #ffffff, #fffc00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


&-logo{

  width:10%;
  height: 10%;

}

  &-title{
    font-size: 4rem;
    

    
    
  }
}


</style>