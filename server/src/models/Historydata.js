const mongoose=require('mongoose');

const History_Schema=mongoose.Schema({
    book_name:{
        type: String,
        required: true
    },
    author_name:{
        type: String,
        required: true
    },
    book_id_number:{
        type: String,
        required: true
    },
    give_take:{
        type: String,
        required: true
    },
    name_of_user:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    contact_number:{
        type: String,
    },
    date:{
        type: String,
        required: true
    }
});

const Historydata=new mongoose.model("Historydata",History_Schema);
module.exports=Historydata;