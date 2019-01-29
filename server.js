var http = require('http');
var express = require('express');
var url = require('url');
var app = express();

var cors = require('cors');
    var bodyParser = require('body-parser');

    var configString = process.env.SQLAZURECONNSTR_Teledata;

app.use(bodyParser.json());

app.post('/', function (req, res) {
		var identity = req.header('X-MS-CLIENT-PRINCIPAL-ID');
		
		var requestString = JSON.stringify(req.body);
			requestObj = JSON.parse(requestString);
			//var QueryString = requestObj.QueryString;
			var QueryString = 'InvoiceCustomerGoogleSP';

    	var sqlParams = "";
			for (x in requestObj.Params){
				sqlParams += ", @" + x;
				//var Param2 = requestObj.Params[x];
			}
		sqlParams = sqlParams.slice(1);
    	//var sqlstring = "Exec " + QueryString + sqlParams;
    	//var sqlstring = "Exec InvoiceCustomerGoogleSP, @Google 'jonsmith840@gmail.com'";

    	var sql = require("mssql");
    	//var TYPES = require('tedious').TYPES;  
    	
/*
    sql.connect(configString, function (err) {
    
        if (err){
        	console.log(err);
        } 
		var request = new sql.Request();
        //request.input('Google', sql.VarChar, 'jonsmith840@gmail.com');
			for (x in requestObj.Params){
				if (isNaN(requestObj.Params[x])){
					request.input(x, sql.VarChar, requestObj.Params[x]);
				} else {
					if (Number.isInteger(requestObj.Params[x])){
						request.input(x, sql.Int, requestObj.Params[x]);
					} else {
						request.input(x, sql.Float, requestObj.Params[x]);
					}
				}
			}
        request.execute(QueryString, function (err, result) {
        //request.query(sqlstring, function (err, recordset) {
        		/*
            */
            if (err) console.log(err)

            // send records as a response
        	//res.writeHead(200, { 'Content-Type': 'text/html' });
        	res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
            sql.close();
        });
        
    });*/
    res.end(identity);
    
}).listen(process.env.PORT || 8080);
/*
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("Hello, world. I can't believe mssql worked or why tedious doesn't! Connecting throws an internal error.");
   
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
    
        if (err) res.send(err);

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
*/
