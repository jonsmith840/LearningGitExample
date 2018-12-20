var http = require('http');
var express = require('express');
var url = require('url');
var app = express();
//const mssql = require('mssql');

var cors = require('cors');
    var bodyParser = require('body-parser');
    //var Connection = require('tedious').Connection;  
    //var Request = require('tedious').Request;  
    //var TYPES = require('tedious').TYPES;  
/*

    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
    
//var sql = require("mssql");
http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Hello, world. I can't believe mssql worked or why tedious doesn't! Just need to rebuild the whole of the rest of the script now.");
    
}).listen(process.env.PORT || 8080);
*/
app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'cm97@uobe7kufo3',
        password: 'Azur3Pswd',
        server: 'uobe7kufo3.database.windows.net', 
        database: 'Teledata' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Contacts where Code = 18985', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(8080, function () {
    console.log('Server is running..');
});