const {createPool}=require('mysql2/promise');
const pool=createPool({
    host:'localhost',
    user:'root',
    database:'sistemacine',
    port:3306,
    password:''
})
module.exports=pool;