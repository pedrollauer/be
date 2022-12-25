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
	console.log(req.body)
	let query = 'Select * from strings where language='+req.body.lang;
	const [strings,]=await connection.query(query);
	

	let stringData={};
	for(const string of strings){
	  stringData[string.string_name]=string.string_data;
	}
	
	
  query='Select * from projetos';
  const [results,] = await connection.query(query);
	  console.log(results)
	for(const result of results)
	{	
	  query='SELECT * FROM `proj_description` WHERE proj_id='+result.proj_id+' and language='+req.body.lang;
		console.log(query);
	  const [description,]=await connection.query(query);

	  query='SELECT stack FROM `proj_stack` WHERE proj_id='+result.proj_id;
		console.log(query);
	  const [stacks,]=await connection.query(query);
	  query='SELECT path FROM `Images` WHERE proj_id='+result.proj_id;
	
	  const [images,]=await connection.query(query);
		console.log(images);
	  responseData.push({title:result.name,description:description[0].description,stacks:stacks,image:images[0].path});
	}


	query='Select taste from tastes where language='+req.body.lang;
	const [tastes,]	= await connection.query(query);
	let allTastes=[];
	for(const taste of tastes){
		allTastes.push(taste.taste);
	}

	console.log('ResponseData-->');

	
	stringData["projects"]=responseData;
	stringData["tastes"]=allTastes
	console.log(stringData);

  res.send(JSON.stringify(stringData));
}catch(e){
	console.log(e);
}finally{
	connection.end();
	console.log('Connection Successfuly ended.');
}
});

module.exports = router;
