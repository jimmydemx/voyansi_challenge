<template>
  <div class="rooms"> 
     
<el-form class="rooms-add" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  :label-position="'left'" label-width="80px">
    <el-form-item label="id" prop="id">
         <el-input v-model="ruleForm.id" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="name" prop="name">
         <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="number" prop="number">
         <el-input v-model="ruleForm.number"></el-input>
    </el-form-item>
    <el-form-item label="occupant" prop="occupant">
        <el-input v-model="ruleForm.occupant"></el-input>
    </el-form-item>
    <el-form-item>
         <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
         <el-button @click="resetForm('ruleForm')">Reset</el-button>
         <span v-if="error" style="color:red">{{error}}</span>
    </el-form-item>
</el-form>

<p class="rooms-words1">"As remote working culture continues to expand, an emerging real estate startup decides to make all of its buildings available to digital nomads. To track all of the spaces and who is working where..."</p>


<div class='rooms-modify'>

   
    <el-button type="info" class="rooms-modify-button" @click="OnClickGetRooms">Get All Rooms ></el-button>
    <p v-if="showAllRooms" class="rooms-modify-all">{{allRooms}}</p>
    <div class="rooms-modify-input">
    <el-input class="rooms-modify-roomid" v-model="RoomID" :placeholder="'Insert Room ID'"/>
    <el-input class="rooms-modify-roomoccupant" v-model="RoomOccupant" :placeholder="'Insert new Occupant'"/>
    </div>

    <div class="rooms-modify-button1">
    <el-button class="rooms-modify-button1-change" type="warning" @click="OnChangeOccupant" :disabled="disabled">Change Occupant by Room ID</el-button>
     <el-button class="rooms-modify-button1-delete" type="danger" @click="onDelete" :disabled="disabled">Delete Room</el-button>
     <p v-if="reminder">{{reminder}}</p>
    </div>
        <el-button icon="el-icon-search" circle @click="onClickSearch"></el-button>
        <span>click to discover RoomID</span>
    <ul v-if="searchid"> 
        <li class="rooms-modify-list" v-for="(item,index) in allRooms" :key="index">RoomID:{{item.id}}</li>
    </ul>
   
</div>

</div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {


      var checkid=(rule,value,callback)=>{
          if(!value){
              return callback(new Error("id can't be empty"))
          }
          
          if (!Number.isInteger(value*1)|| value[0]==="0") {
            callback(new Error('Please Input an Integer'));
          } else {
            if (value < 0) {
              callback(new Error('Please Input an Integer and the first digit shall not be zero'));
            } else {
            this.ruleForm.id=value*1
              callback();
              
            }
          }
      }
      var checkNum=(rule,value,callback)=>{
          if(!value){
              return callback(new Error("Number can't be empty"))
          }
          if (!Number.isInteger(value*1)|| value[0]==="0") {
             
            callback(new Error('Please Input an Integer and the first digit shall not be zero'));
          } else {
            if (value < 0) {
              callback(new Error('The Value shall > 0'));
            } else {
              this.ruleForm.number=value*1  
              callback();
            }
          }
      
      } 
      var checkOccup=(rule,value,callback)=>{
          if(!value){
              return callback(new Error("Occupant can't be empty"))
          }
          var reg=/[0-9_\-a-zA-Z]+/;
       
          
          if (value.length>value.match(reg)[0].length) {
            callback(new Error('Please input combination of number,letter,undersscore or dash'));
          } else {
              callback();
            }
          
          
      } 
      var checkname=(rule,value,callback)=>{
          if(!value){
              return callback(new Error("Name can't be empty"))
          }
          var reg=/[0-9_\-a-zA-Z]+/;
        
          if (value.length>value.match(reg)[0].length) {
            callback(new Error('Please input combination of number,letter,undersscore or dash'));
          } else {
              callback();
            }
          

      }

      return {
       showAllRooms:false,   
        searchid:false,
        allRooms:[],
        RoomID:null,
        RoomOccupant:'',
        disabled:"disabled",
        error:'',
        reminder:'',
        ruleForm: {
          id: null,
          name: '',
          number: null,
          occupant:''
        },
        rules: {
          id: [
            { required: true, type:'number',validator: checkid, trigger: 'change' }
          ],
          name: [
            { required: true,validator: checkname, trigger: 'change' }
          ],
          number: [
            { required: true,validator: checkNum,type:'number', trigger: 'change' }
          ],
         occupant: [
            { required: true,validator: checkOccup, trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/room',this.ruleForm).then((res)=>{
                if(res.data.code===0){
                    this.allRooms.push(this.ruleForm)
                }else{

                    this.error="Registration error"
                    setTimeout(()=>{
                        this.error=""

                    },3000)
                    
                }
                
            })
            alert('submit!');

          } else {
            console.log('error submit!!');
             this.error="error submit!!"
            setTimeout(()=>{
                    this.error=""       

                    },3000)
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      OnClickGetRooms(){

          this.showAllRooms=!this.showAllRooms
      },
      OnChangeOccupant(){
          axios.put('/occupant',{id:this.RoomID*1,occupant:this.RoomOccupant}).then((ctx)=>{

              if(ctx.data.code===0){
                    this.reminder="Change successfully"
                    console.log(ctx.data)
                    this.allRooms.forEach((item,key)=>{
                        if(item.id===this.RoomID*1){
                            this.allRooms[key].occupant=this.RoomOccupant
                        }
                    })

              }else{

                  this.reminder="Change failed"
              }
              setTimeout(()=>{
                      this.reminder=""
                  },3000)

          })

      },
      onDelete(){
          console.log(this.RoomID)
          axios.delete("/room",{
              params:{id:this.RoomID*1}}).then((ctx)=>{
                  if(ctx.data.code===0){

                      this.reminder="Delete Successfully"
                      console.log(ctx.data)
                      this.allRooms=this.allRooms.filter((item)=>{

                          return this.RoomID*1!==item.id
                      })
                      
                  }else{
                      this.reminder="Delete Unsuccessfully"
                  }

                  setTimeout(()=>{
                      this.reminder=""
                  },3000)
              
          })

      },
      onClickSearch(){
          this.searchid=!this.searchid;
          
      }
    },
    mounted(){
        axios.get('/rooms').then((res)=>{
              console.log(res.data)
              if(res.data.code===0){
                  
                  res.data.data.forEach(item => {
                      
                      var items={
                          id:item.id,
                          name:item.name,
                          number:item.number,
                          occupant:item.occupant
                        } 
                        this.allRooms.push(items)  
                  });     
              }
          })
    },

    watch:{
        RoomID(newval,oldval){

            var some=this.allRooms.some((value,index,array)=>{
                console.log(value.id,newval)
                return value.id===newval*1
            })

            if(some){
                this.disabled=false
                console.log("There is an ID available")

            }else{
                this.disabled=true
                console.log("There is No such ID")
            }

        }



    }
  }
</script>

<style lang="scss">
.rooms{
    display:flex;
    box-sizing: border-box;
    flex-wrap: wrap;


    &-words1{
            align-self: center;
            font-size:2rem;
            flex: 1 0 50%
        }

    &-add{
        flex: 1 0 40%;
    
        margin:2em;
        padding:2em;
        border: 4px #07ac59 dotted;
        border-radius: 0.3em;

    }

    &-modify{
        flex: 100%;
        margin: 2em;


        

        &-button{

            display: block;
            margin: 0 auto;
            width:80%;

        }
        &-button1{

            display: block;
            margin: 0 auto;
            width:60%;
            display: flex;
           

            &-change{
                width: 30%;
                margin-right: 20%;
            }
            &-delete{
                width: 30%;
               
            }

        }
        
        &-all{
            
            margin:2rem 15%;
            display: block;
            width: 70%;
            height: 2em;
            overflow-x: auto;
            border-top: 1px green solid;
            

        }

        &-input{
            width: 80%;
            margin: 0 auto;

        }

        &-roomid{
            width: 40%;
            margin:2em;

        }
        &-roomoccupant{
             width: 40%;
             margin:2em;


        }
    
    
     &-list{
         list-style: none;
         

     }
     
     }

}

</style>