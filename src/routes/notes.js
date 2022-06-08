const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const {isAthenticated} = require('../helpers/auth')




router.get('/notes/add', isAthenticated, (req,res)=>{
    res.render('notes/new-notes')
})

router.post('/notes/new-note',isAthenticated, async (req,res)=>{
const {description, title} = req.body;
const errors = [];
if(!title){
    errors.push({text:'Please Write a Title'})
}
if(!description){
    errors.push({text: 'Plase incert a Description'});
}
if(errors.length > 0){
    res.render('notes/new-notes', {
        errors,
        title,
        description,
    })
    } else{
     const newNote = new Note({title, description})
    await newNote.save()
    req.flash('success_msg', 'Note Add Succesfully')
    res.redirect('/notes')
    }
})


router.get('/notes',isAthenticated, async (req,res)=>{
const notes = await Note.find({}).lean().sort({date:'desc'})
res.render('notes/all-notes', {notes})
})

router.get('/notes/edit/:id', async (req,res) =>{
   const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note})
})

router.put('/notes/edit-note/:id',isAthenticated, async (req,res)=>{
    const {title, description} = req.body
     await Note.findByIdAndUpdate(req.params.id, {title, description});
     req.flash('success_msg', 'Note Update Succefully')
     res.redirect('/notes');
})

router.delete('/notes/delete/:id',isAthenticated, async (req,res) =>{
   await Note.findByIdAndDelete(req.params.id)
   req.flash('success_msg', 'Note Delete Succefully')
    res.redirect('/notes')
})


module.exports = router;