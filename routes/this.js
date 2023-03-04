var express = require('express');
var router = express.Router();
var db = require('./db_config');
var cors = require('cors');

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
	switch(req.body.page){
		case 0:
			res.send(JSON.stringify(await getHeaderData(req.body)))
			break;
		case 1:
			res.send(JSON.stringify(await getHomeData(req.body)))
			break;
		case 2:
			res.send(JSON.stringify(await getProjData(req)))
			break;
		case 3:
			res.send(JSON.stringify(await getProjDetails(req)))
			break;
		default:
			res.send("Not Found")
			break
	}
});

const getProjDetails = async(req) =>{

  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(db.config);
  let responseData=[];

  let stringData={};
  query='Select feature_name as name, feature_description as description, feature_image as image from this.proj_features where proj_id='+req.body.proj_id+' and language = '+req.body.lang;
  const [results,] = await connection.query(query);
	  console.log(results)

  query='Select dependency_name as name, dependency_description as description from this.proj_dependencies where proj_id='+req.body.proj_id+' and language = '+req.body.lang;
  const [dependencies,] = await connection.query(query);

  query = 'Select video, name, video_description, description from  `proj_description` where language = '+req.body.lang + ' and proj_id ='+req.body.proj_id;
  const [info,] = await connection.query(query);

  stringData["video"] = info[0].video
  stringData["name"] = info[0].name
  stringData["video_description"] = info[0].video_description
  stringData["description"] = info[0].description

  stringData["features"] = results
  stringData["dependencies"] = dependencies

	query = 'Select * from this.page_strings where page_id = 3 and language='+req.body.lang;

	const [pages, ] = await connection.query(query);

	const strings = []
	console.log(pages)	
	for(const page of pages){
		strings.push({[page.string_name]: page.string_content})
	}
	stringData['strings']= strings
  return stringData;
}

const getProjData = async(req) =>{

  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(db.config);
  let responseData=[];

  let stringData={};
  query='Select * from projetos';
  const [results,] = await connection.query(query);
	  console.log(results)
	for(const result of results)
	{	
	  query='SELECT * FROM `proj_description` WHERE proj_id='+result.proj_id+' and language='+req.body.lang;
	  const [description,]=await connection.query(query);

	  query='SELECT stack FROM `proj_stack` WHERE proj_id='+result.proj_id;

	  const [stacks,]=await connection.query(query);
	  query='SELECT path FROM `Images` WHERE proj_id='+result.proj_id;
	
	  const [images,]=await connection.query(query);

        console.log('**********************************************')
        console.log(result)
	  responseData.push({title: result.title, proj_id:result.proj_id ,description:description[0].description,stacks:stacks,image:images[0].path});
	}

	query = 'Select * from this.page_strings where page_id = 2 and language='+req.body.lang;

	const [pages, ] = await connection.query(query);

	for(const page of pages){
	  stringData[page.string_name]=page.string_content;
	}
	

	
	stringData["projects"]=responseData;
	
	console.log(stringData);

  return stringData;
}

const getHomeData = async(request) => {

	const strings = await queryDataBase('Select * from this.page_strings where page_id = 1 and language='+request.lang);
	let stringData={};
	for(const string of strings){
	  stringData[string.string_name]=string.string_content;
	}

	return stringData
}

const getHeaderData = async(request) =>{

	const strings = await queryDataBase('Select * from this.strings where language='+request.lang);
	let stringData={};
	for(const string of strings){
	  stringData[string.string_name]=string.string_data;
	}

	return stringData
}
module.exports = router;
