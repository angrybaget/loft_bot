var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'baget',
    password : 'baget',
    database : 'bot'
});

connection.connect();

connection.query('SELECT * from settings', function(err, rows, fields) {
    if (!err){
        console.log('The solution is: ', fields);
        console.log('The solution is: ', rows[1].body);
    }
    else
        console.log('Error while performing Query.');
});

connection.end();