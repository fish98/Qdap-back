'use strict'

const Koa = require('koa');
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaCors = require('@koa/cors')
const mysql = require('mysql2/promise')

const config = require('./config')

console.log(config)

// config

async function main(){

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

async function ttfish(){
    
    const [rows, fields] = await connection.query(`select * from ${table}`);
    console.log(rows);
    }

// connection.then(connect => connect.query(`select * from ${table}`)).then(([rows, fields]) => console.log(rows))

ttfish()

// mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '123456',
//         database: 'ttfish'
// }).then(connect => connect.query(`select * from ${table}`)).then(([rows, fields]) => console.log(rows))


//

router.get('/all', async(ctx, next) => {
    let [fish, field] = connection.then(connect => connect.query(`select * from ${table}`)).then(([rows, fields]) => console.log(rows))
        console.log("query all data")
        console.log(fish)
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
}

main()