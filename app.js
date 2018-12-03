'use strict'

const Koa = require('koa');
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaCors = require('koa2-cors')
const mysql = require('mysql2/promise')

const config = require('./config')

async function main(){

// const fish = {
//     "id": "fish",
//     "package": "Computer", 
//     "place": "Bird",
//     "deadline": 3,
//     "reward": 5000,
//     "detail": "hahahahahahahaha",
//     "remark": "ttfish",
//     "image": "xxx.jpg" 
// }

const koaOptions = {
    origin: '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }

// table

const table = "test"

// SQL

const connection = await mysql.createConnection(config)

// connection.connect(function(err){
//         if (err) {
//     console.error('error connecting: ' + err.stack)
//     return
//         }
//     })

// async function findData (id) {
//     connection.query(`select * from ${table} where id = ?`, id, (err, result) => {
//         if (err) throw err
//         return result
//         })
//     }

async function insertData (data) {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err) => {
        if (err) throw err
        console.log(`insert data ${ctx.request.body}`)
        })
    }

// Middleware

const app = new Koa()
const router = new Router()

// test here //

//

router.get('/all', async(ctx, next) => {
    const rows = await connection.query(`select * from ${table}`)
    let result = rows[0]
    console.log("query all data")
    ctx.body = result
})

// ready to finish feature!

// router.get('/status', (ctx, next) => {
//     ctx.body = "Hi TTfish"
//     console.log(ctx.request.body)
// }

router.post('/new', (ctx) => {
    ctx.body = "Success"
    insertData(JSON.parse(ctx.request.body))
    console.log("insert data success")
})

app.use(koaCors(koaOptions))
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(8102)

console.log("Start listening port 8102")

}

main()