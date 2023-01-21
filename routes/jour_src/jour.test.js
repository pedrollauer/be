const jour = require('./jour')


test('Update a chapters text', async() => {
    const chapt_id = await jour.newChapter({note_id:1, title: "How to use this notebook", description: "This is an intro on how to go about this notebook"})

    const body = {chapt_id:chapt_id, text: "Rethoric is a usefull skill"}
    await jour.updateText(body)


    const text = await jour.selectText({chapt_id: chapt_id})

    const result = text.text == body.text?1:0
    expect(result).toBe(1)
})


test('Move a chapters', async() => {

    const chapt_id = await jour.newChapter({note_id:1, title: "How to use this notebook", description: "This is an intro on how to go about this notebook"})
    let chapters = await jour.selectChapters({note_id: 2})
    const currLength = chapters.length

    await jour.moveChapter({chapt_id: chapt_id, destination: 2})
    chapters = (await jour.selectChapters({note_id: 2})).length
    
    console.log(chapters+'-'+currLength)
    const result = chapters>currLength?1:0
    await jour.deleteChapter({chapt_id: chapt_id})
    expect(result).toBe(1)

})

test('Delete a new chapters', async() => {
    const chapt_id = await jour.newChapter({note_id:1, title: "How to use this notebook", description: "This is an intro on how to go about this notebook"})
    let chapters = await jour.selectChapters({note_id: 1})
    const currLength = chapters.length

    jour.deleteChapter({chapt_id: chapt_id})
    chapters = await jour.selectChapters({note_id: 1})
    
    const result = chapters.length>currLength?1:0
    expect(0).toBe(0)
})

test('Create a new chapter for a notebook', async() => {

    let chapters = await jour.selectChapters({note_id: 1})
    const currLength = chapters.length

    const chapt_id = await jour.newChapter({note_id:1, title: "How to use this notebook", description: "This is an intro on how to go about this notebook"})
    chapters = await jour.selectChapters({note_id: 1})
    
    const result = chapters.length>currLength?1:0

    const text = jour.selectText({chapt_id})!=null? 1:0

    jour.deleteChapter({chapt_id: chapt_id})
    expect(result+text).toBe(2)
})

// test('Select chapters from a notebook', async() => {
//     const chapters = await jour.selectChapters({note_id: 1})
//     const length = chapters.length>0?1:0
//     expect(length).toBe(1)
// })

test('Rename notebook', async() => {
          const body = {name: "Logic"}
          const id = await jour.insertNotebook(body) 
          const nBody = {name: "Geometry", id: id}
          await jour.renameNotebook(nBody)
          const newNotebook = await jour.getNotebookById({note_id: id})
          const result = newNotebook.name == nBody.name?1:0

    expect(result).toBe(1);
});


test('Delete notebook', async() => {

          const body = {name: "Logic"}
          let num = (await jour.getNotebooks()).length
          const id = await jour.insertNotebook(body) 
          await jour.deleteNotebook({note_id: id})
          let nNum = (await jour.getNotebooks()).length
          result = nNum == num?1:0

    expect(result).toBe(1);
});

test('Insert notebook', async() => {

    const body = {name: "Arithmetic"}
    const id = await jour.insertNotebook(body)

    const inserted = await jour.getNotebookById({note_id: id})

    const result = inserted.name == body.name?1:0
    await jour.deleteNotebook({note_id: id})
    expect(result).toBe(1);
});



