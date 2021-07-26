const mongoose=require('mongoose');

const Book_Schema=mongoose.Schema({
    book_name:{
        type: String,
        required: true
    },
    author_name:{
        type:String,
        required: true,
    },
    book_id_number:{
        type:String,
        required:true,
        unique: true
    },
    status:{
        type:String,
        required:true
    },
    assigned_to:{
        type:String,
        required: false
    },
    email:{
        type:String,
        required: false
    },
    contact_number:{
        type:String,
        required: false
    },
    address:{
        type:String,
        required: true
    }
})

const Book=new mongoose.model("Book",Book_Schema);
module.exports=Book; 