const Koa = require('koa');
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaCors = require('@koa/cors')
const mysql = require('mysql2')

// config

const fish = {
    "id": "fish",
    "package": "Computer", 
    "place": "Bird",
    "deadline": 3,
    "reward": 5000,
    "detail": "hahahahahahahaha",
    "remard": "ttfish",
    "image": "xxx.jpg" 
}

const table = "test"

// SQL

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root'
})

connection.connect(function(err){
        if (err) {
    console.error('error connecting: ' + err.stack)
    return
        }
    })

// const findData = (id) => {
//     connection.query(`select * from ${table} where id = ?`, id, (err, result) => {
//         if (err) throw err
//         return result
//         })
//     }

const insertData = (data) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err) => {
        if (err) throw err
        console.log(`insert data ${ctx.request.body}`)
        })
    }

// Middleware

const app = new Koa()
const router = new Router()

router.get('/all', async(ctx, next) => {
    var data
    connection.query(`select * from ${table}`, (err, result) => {
        if (err) throw err
        console.log("query all data")
        data = result
    })
    console.log(data)
    // ctx.body = result
})

// ready to finish feature!

// router.get('/status', (ctx, next) => {
//     ctx.body = "Hi TTfish"
//     console.log(ctx.request.body)
// }

router.post('/new', (ctx) => {
    ctx.body = "Success"
    insertData(ctx.request.body)
})

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaCors())

app.listen(8102)

console.log("Start listening port 8102")