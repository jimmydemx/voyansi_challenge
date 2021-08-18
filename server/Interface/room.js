// import Router from 'koa-router';
// import room from '../Schema/room';
// import axios from '../util/axios'
// const axios=require('./utils/axios')

const Router=require("koa-router");
const room =require("../Schema/room");
const axios=require('../util/axios')

let router= new Router()


router.post('/room',async(ctx)=>{
   const {id,name,number,occupant}= ctx.request.body

   let user = await room.find({id})
   
   if (user.length) {
     ctx.body = {
       code: -1,
       msg: 'the id or the room number has been registered'
     }
    }else{
        var newRoom= await room.create({
            id:id,
            name:name,
            occupant:occupant,
            number:number
        })
        console.log(ctx.request.body)
        ctx.body={
            code:0,
            data:newRoom
        }
    }    

})



router.get('/rooms',async(ctx)=>{

    var allrooms=await room.find()

    if(allrooms){
        ctx.body={
            code:0,
            data:allrooms
        }
    }else{
            ctx.body={
                code:-1,
                mesg:"Something Wrong"

            }
        }
    



})







router.put('/occupant',async(ctx)=>{
    
   const {id,occupant}=ctx.request.body
   console.log(id,occupant)

    try{
        var changedOccupant=await room.updateOne({id:id},{"occupant":occupant})
       
            ctx.body={
                code:0,
                data:changedOccupant
            }
    }catch(e){
        ctx.body={
            code:-1,
            data:e
        }
        
    }
    

})





router.delete('/room',async(ctx)=>{
    

    const roomid=ctx.query.id;
    var error="";

room.remove({id: roomid}, function(err, docs){
        if(err) {
            console.log(err);
            error=err
        }
        console.log('Delete Successfully' + docs);
    })


        if(error){
            ctx.body={
                code:-1,
                error:error
            }

        }else{
            ctx.body={
                code:0,
                data:"Delete Successfully"
            }
        }    

})

// router.get("/room",async(ctx)=>{


//     console.log("12345")
//     ctx.set('Access-Control-Allow-Origin', '*');

//     var nuser= await room.create({
//         id:1,
//         name:'room1',
//         occupant:"teacher",
//         numer:2
//     })
//     ctx.body={

//         code:200,
//         data:nuser
//     }

// })


module.exports=router