const {createPool}=require('mysql2/promise');
const pool=createPool({
    host:'localhost',
    user:'root',
    database:'sistemacine2',
    port:3306,
    password:'root'
})
module.exports=pool;