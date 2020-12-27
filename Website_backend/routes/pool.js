var mysql=require('mysql');
var pool =mysql.createPool({host:'127.0.0.1',
user:'root',password:'123',
database:'task',
connectionlimit:'100'});
module.exports=pool;

/* 
https://5f1a8228610bde0016fd2a74.mockapi.io/getTestList */