const {createPool}=require('mysql2/promise');
const pool=createPool({
    host:'localhost',
    user:'root',
    database:'sistemacine',
    port:3306,
    password:''
    // host:'servidordemo2.mysql.database.azure.com',
    // user:'alonzofer041',
    // database:'sistemacine',
    // port:3306,
    // password:'Revan.12.34.5'
})
module.exports=pool;