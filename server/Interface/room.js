import Router from 'koa-router';
import room from '../Schema/room';
import axios from '../util/axios'
// const axios=require('./utils/axios')


let router= new Router()


router.post('/room',async(ctx)=>{
    var newRoom= await room.create({
        id:1,
        name:'room1',
        occupant:"teacher",
        numer:2
    })



})

router.put('occupant',async(ctx)=>{



})





router.delete('/room',async(ctx)=>{



})

router.get("/room",async(ctx)=>{


    console.log("12345")
    ctx.set('Access-Control-Allow-Origin', '*');

    var nuser= await room.create({
        id:1,
        name:'room1',
        occupant:"teacher",
        numer:2
    })
    ctx.body={

        code:200,
        data:nuser
    }

})


module.exports=router