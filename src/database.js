const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/notes-db-app', 
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)
