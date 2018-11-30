const Koa = require('koa');
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaCors = require('@koa/cors')
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    // user: 'root',
    // password: '123456',
    // database: 'ttfish'
})

const app = new Koa()
const router = new Router()

router.get('/new', (ctx, next) => {
    ctx.body = "Hi TTfish"
    console.log(ctx.request.body)
})

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaCors())

app.listen(8102)

console.log("Start listening port 8102")