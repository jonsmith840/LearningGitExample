var http = require('http');
var express = require('express');
var url = require('url');
//const sql = require('mssql');

var cors = require('cors');
    var bodyParser = require('body-parser');
    //var Connection = require('tedious').Connection;  
    //var Request = require('tedious').Request;  
    //var TYPES = require('tedious').TYPES;  

    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
    
var sql = require("mssql");

var app = express();
http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, world. I can't brlieve mssql worked! Just need to rebuild the whole of the rest of the script now.');
    
}).listen(process.env.PORT || 8080);
