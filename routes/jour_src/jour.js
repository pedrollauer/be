var db = require('../db_config');


const queryDataBase = async(query, values, func) => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(db.config);
  try{

  const [response, result] = await connection.query(query, values)

      if(func != null){
          await func(response, result)
      }
    
  return response;
  }catch(e){
	console.log(e)
  }finally{
	connection.end()
  }
}

const getNotebookById= async(body) => {

    const query = 'select * from journal.notebooks where id='+body.note_id

    const response = await queryDataBase(query)

    return response[0]
}

const getNotebooks = async() => {

    const query = 'select * from journal.notebooks'

    const response = await queryDataBase(query)

    return response
}

const deleteNotebook = async(body) => {
    const query = 'delete from journal.notebooks where id='+body.note_id
    await queryDataBase(query) 
}

const insertNotebook = async(body) => {
    const query = 'insert into journal.notebooks (name, created) values (?, now())'
    let id
    await queryDataBase(query, body.name, async (response, results) => {
        id = response.insertId
    })
   
    return id
}

const renameNotebook = async(body) =>{
        
    const query = 'update journal.notebooks set name ="'+ body.name + '" where id ='+ body.note_id

    await queryDataBase(query)

}

const updateText = async(body) => {
    let query =  'Update journal.texts set title = "'+body.title+'", text="'+body.text+'" where id='+body.chapt_id
    await queryDataBase(query)

    if(body.title == null){
        return
    }
    query =  'Update journal.chapters set title="'+body.title+'" where id='+body.chapt_id
    await queryDataBase(query)
}

const selectText = async(body) => {
    const query = 'Select * from journal.texts where id = '+body.chapt_id
    return (await queryDataBase(query))[0]
}

const moveChapter = async(body) => {
    const query = 'Update journal.chapters set note_id = '+body.destination+' where id = '+ body.chapt_id
    await queryDataBase(query)
}

const deleteChapter = async(body) => {
    
    let query = 'Delete from journal.chapters where id='+body.chapt_id
    await queryDataBase(query)
    
    query = 'Delete from journal.texts where id='+body.chapt_id
    await queryDataBase(query)
}

const newChapter = async(body) => {
    let query = 'insert into journal.chapters (note_id, title, description, created, last_mod) values (?,?,?,now(),now())'    

    let id
    const values = [body.note_id, "New Chapter",""]
    await queryDataBase(query, values,async (response, result)=>{
        id = response.insertId

        const nquery = 'insert into journal.texts (id, text) values (?,?)'
        await queryDataBase(nquery, [id, ""])
    })

    return id
}

const selectChaptersById = async(body) => {

    const query = 'select * from journal.chapters where id = '+body.chapt_id

    return chapters = await queryDataBase(query)
}

const selectChapters = async(body) => {

    const query = 'select * from journal.chapters where note_id = '+body.note_id

    return chapters = await queryDataBase(query)
}

function notebooks(req){
    return {sum: 3}
}

module.exports = {getNotebookById, deleteNotebook, getNotebooks, insertNotebook, renameNotebook, selectChapters, newChapter, deleteChapter, moveChapter, selectText, updateText}
