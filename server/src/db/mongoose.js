const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://library_user:WJRT6AQz06BjLooR@cluster0.nfroa.mongodb.net/test",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("dataBase connected successfully!!!!! 👍 ");
}).catch((e)=>{
    console.log("ERROR during dataBase connection 😠",e);
})