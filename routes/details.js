var express = require('express');
var router = express.Router();
var db = require('./db_config');
var cors = require('cors');

var corsOptions = {
	origin: '*'
}


router.post('/',cors(corsOptions),async  function(req, res, next) {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(db.config);
  let responseData=[];
try{
  const stringData={hello:'World'};
  res.send(JSON.stringify(stringData));
}catch(e){
	console.log(e);
}finally{
	connection.end();
	console.log('Connection Successfuly ended.');
}
});

module.exports = router;
