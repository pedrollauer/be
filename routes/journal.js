var express = require('express');
var router = express.Router();
var db = require('./db_config');
var cors = require('cors');
var jour = require('./jour_src/jour')
var corsOptions = {
	origin: '*'
}

const queryDataBase = async(query) => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(db.config);
  try{

  const [response,] = await connection.query(query)

  return response;
  }catch(e){
	console.log(e)
  }finally{
	connection.end()
  }
}

router.post('/',cors(corsOptions),async  function(req, res, next) {
	console.log(req.body)
	switch(req.body.command){
		case 0:
			res.send(JSON.stringify(await jour.getNotebooks()))
			break;
		case 1:
			res.send(JSON.stringify(await jour.deleteNotebook(req.body)))	
			break;
		case 2:
		
			break;
		case 3:
	
			break;
		default:
			res.send("Not Found")
			break
	}
});


const getHeaderData = async(request) =>{

    console.log('Breaking in...')
	const strings = await queryDataBase('Select * from this.strings where language='+request.lang);
	let stringData={};
	for(const string of strings){
	  stringData[string.string_name]=string.string_data;
	}

    console.log(stringData)
	return stringData
}

const getNotebooks = (a,b) =>{
    return a+b
}
module.exports = router;
