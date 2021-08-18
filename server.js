const { Nuxt, Builder } = require('nuxt')
const koa=require('koa')
const bodyParser=require('koa-bodyparser')
const room=require('./server/Interface/room')
const mongoose =require ('mongoose')
const dbConfig =require ("./server/util/mongo.js")

const app = new koa()
const host = process.env.HOST || '127.0.0.1' 
const port = process.env.PORT || 3000
// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')

// Import and Set Nuxt.js options


app.use(bodyParser({
  extendTypes:['json','form','text']
}))

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }


console.log("aaa",process.env.MONGOLAB_URI)
mongoose.connect(dbConfig(),{
    useNewUrlParser: true,
  })
 
app.use(room.routes())
.use(room.allowedMethods())



app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })
  
  app.listen(port, host)
  consola.ready({message: `Server listening on http://${host}:${port}`, badge: true})
  }
  start()
  