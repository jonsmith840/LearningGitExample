#!/usr/bin/env nodejs
var http = require('http');
var express = require('express');
var url = require('url');
var cors = require('cors');
    var bodyParser = require('body-parser');
    var Connection = require('tedious').Connection;  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  

    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
    
//var sql = require("mssql");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
//var port = normalizePort(process.env.PORT || 8083);
//app.set('port', '8083');
app.all('/databaseconnect', function(request, response){
/*		var getParams = url.parse(request.url, true).query;
		var resultSql = '<br>';
		if (Object.keys(getParams).length == 0){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end('hello all');
		} else {*/
			var requestString = JSON.stringify(request.body);
			requestObj = JSON.parse(requestString);
			var QueryString = requestObj.QueryString;
			/*
			for (x in requestObj.Params){
				eval('var '+ x +' = "' + requestObj.Params[x] + '"');
				//var Param2 = requestObj.Params[x];
			}
			*/
			//var Param2 = requestObj.Params.Param1;
			//var Param1 = "jonathan";
			//var QueryString = Object.keys(requestObj).find(key => object[key] === 'QueryString');;
			response.writeHead(200, {'Content-Type': 'application/json'});
			//response.write('<html><body>');
			//response.write('Just to check that it will write.<br>');
			//response.write('Hello ' + getParams.name + '<br>');
    var connection = new Connection(config);

    connection.on('connect', function(err) {
    		
    		if (err){
    			console.log(err);
    			response.end('</body></html>');
    		} else {
    			console.log('Got through to Teledata.');
    			//response.write("Before testing for error with the connection.<br>");
    			executeStatement();
    			//response.end("Query string = " + QueryString);
    		}

    function executeStatement() {
    	var sqlParams = "";
			for (x in requestObj.Params){
				sqlParams += ", @" + x;
				//var Param2 = requestObj.Params[x];
			}
		sqlParams = sqlParams.slice(1);
    	var sql = "Exec " + QueryString + sqlParams;
        //request = new Request("Exec " + QueryString + " @Staff", function(err) {  
        request = new Request(sql, function(err) {  
        if (err) {  
            //console.log(err);
        }  
        });  
        var result = "";
        var resultLines = {};
			for (x in requestObj.Params){
				if (isNaN(requestObj.Params[x])){
					request.addParameter(x, TYPES.VarChar, requestObj.Params[x]);
				} else {
					if (Number.isInteger(requestObj.Params[x])){
						request.addParameter(x, TYPES.Int, requestObj.Params[x]);
					} else {
						request.addParameter(x, TYPES.Float, requestObj.Params[x]);
					}
				}
			}
//        request.addParameter('Staff', TYPES.Int, Param2);
        request.on('columnMetadata', function(columns) {  
            columns.forEach(function(column) {  
              /*if (column.value === null) {  
                console.log('NULL');  
              } else {*/  
                result+= column.colName;  
              /*} */ 
            }); 
            response.write(result);
            result ="";
        });
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              /*if (column.value === null) {  
                console.log('NULL');  
              } else {*/  
                result+= column.value;  
              /*} */ 
            });  
            //console.log(result);
            //response.write(result);
            response.write(result);
            result ="";
            
        });  
/*
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');
        });  
*/        
        request.on('doneInProc', function (rowCount, more, rows) {  
        		console.log('doneInProc: '+ rowCount + ' row(s) returned');
        		/*
        		resultSql += rowCount + ' row(s) returned';
        		response.write(resultSql);
        		*/
        		response.end();
        });         
        connection.execSql(request);  
    }  
    }); 
			
//		}
});


app.listen(8080);

/*
var server = http.createServer(app);
server.listen('8083');

	server.on('listening', function(req, res){
		console.log('Server running at http://localhost:8083/');
    //app.get(function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var Connection = require('tedious').Connection;  
    var OutputText = "Initial var.";
    var JSONarray = 0;

    var config = {  
        userName: 'cm97@uobe7kufo3',  
        password: 'Azur3Pswd',  
        server: 'uobe7kufo3.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'Teledata', rowCollectionOnRequestCompletion: true}  
    };  
    
    var result = "";
res.write('<html>');
res.write('<body>');
res.write(OutputText);
   
    var connection = new Connection(config);  

    connection.on('connect', function(err) {
    		//res.write("Before testing for error with the connection");
    		if (err){
    			console.log(err);
    		} else {
    			executeStatement();
    		}
    // If no error, then good to proceed.  
        //result += "Connected"; 
        //OutputText = err;
        /*executeStatement(sqlResult, function(){
        		OutputText = sqlResult;
        }); 
    
    });
    connection.on('debug', function(err) {
    		console.log(err);
    });
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
    	console.log("Executing statement");
        request = new Request("select * from ManageDatabase where Item = 'Instalment Slip trust'", function(err, rowcount, rows) {  
        if (err) {  
            console.log(err);
            //res.write(rowcount);
        }
        JSONarray.push(rowcount);
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                result += 'NULL';  
              } else {  
                result += column.value + " ";  
              }  
            });
            
            //console.log(result);
            //JSONarray.push(result);
            //result ="";  
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        res.write(rowCount + ' rows returned');  
        }); 
        connection.execSql(request);
    }  
  if (connection){
    res.write(JSON.stringify(JSONarray));
  } else {
  	  res.write("No output available.");
  }
res.write('</body>');
res.write('</html>');
   res.end();
});
var config = {
        user: 'cm97@uobe7kufo3',
        password: 'Azur3Pswd',
        server: 'uobe7kufo3.database.windows.net', 
        database: 'Teledata' 
    };
    sql.connect(config);
  
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var sel = new sql.Request();
           
        // query to the database and get the records
        sel.query('select * from ManageDatabase', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(8083, function () {
    console.log('Server is running..');
});
*/

