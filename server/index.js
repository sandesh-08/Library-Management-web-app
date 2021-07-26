const express=require('express');
require("./src/db/mongoose");
const Book=require("./src/models/Book");
const Historydata=require("./src/models/Historydata");
const PORT=process.env.PORT || 5000;
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

const processing=(str)=>{
    str=str.toLowerCase();
    return str.trim();
}

app.get('/',async(req,res)=>{
    try{
        const result=await Book.find({}).sort({'_id':-1});
        res.status(200).send({
            'status':'success',
            'data': result
        })
    }catch(e){
        console.log("erro in get '/' ",e);
        res.status(400).send({
            'status':'failed',
            'message':" Inavlid Request ",
            'error': e
        })
    }
})

app.post('/addBook',async(req,res)=>{
    try{
        var dummy_obj=req.body;
        for(var i in dummy_obj) {
            dummy_obj[i]= processing(dummy_obj[i]);
        }
        const addData=new Book(dummy_obj);
        const added=await addData.save();
        res.status(200).send({
            'status':'success',
            'data':added,
            'message': "Succesfully added into data-base"
        })
    }catch(e){
        console.log("error in /addBook post req");
        res.status(400).send({
            'status':'failed',
            'message':'Bad Request: Invalid Data',
            'error':e
        })
    }
})

app.put("/assign/:id",async(req,res)=>{
    try{
        req.body.assigned_to=processing(req.body.assigned_to);
        const result=await Book.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        },{
            new:true,
            useFindAndModify: false
        });
        res.status(202).send({
            'status': 'success',
            'data': result
        })
    }catch(e){
        console.log("ERROR during patch(/assign/:id)",e);
        res.status(400).send({
            'status':'failed',
            'message':" Invalid assign request ",
            'error': e
        });
    }
})

app.get("/assign_user/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await Book.find({_id:id}).sort({'_id':-1});
        if(data[0].status=="unassigned"){
            res.status(200).send({
                'status': 'success',
                'data': data[0],
                'message': 'Data fetched successfully '
            });
        }
        else{
            res.status(200).send({
                'status':'failed',
                'data': data[0],
                'message': `Assigned to ${data[0].assigned_to}`
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(400).send({
            'status': 'failed',
            'error':e,
            'message': '!!! INVALID ID !!!'
        })
    }
})

app.put("/take_back",async(req,res)=>{
    try{
        const obj={
            "book_name": processing(req.body.book_name),
            "author_name": processing(req.body.author_name),
            "book_id_number": processing(req.body.book_id_number)
        }
        console.log("xchwecxl objsss",obj);
        const data=await Book.find(obj);
        console.log(data);
        if(data.length==0){
            console.log("no such book in data-base");
            res.status(200).send({
                'status': 'failed',
                'message': "No such Book exists in data-base"
            })
        }
        else if(data[0].status==="assigned"){
            const imp_data=data[0];
            const result=await Book.updateOne(obj,{
                $set: {
                    "status": "unassigned",
                    "assigned_to": '',
                    "email": '',
                    "contact_number": '',
                    "address": req.body.address
                }
            },{
                new:true,
                useFindAndModify: false
            });
            console.log(result);
            res.status(200).send({
                'status': 'success',
                'message': ' Update Saved Successfully ',
                'data': result,
                'imp_data':imp_data
            })
        }
        else{
            res.status(200).send({
                'status': 'failed',
                'message': 'This Book was not given to any user '
            });
        }
    }
    catch(e){
        res.status(400).send({
            'status': 'failed',
            'error': e,
            'message': ' Invalid data '
        })
    }
})

app.get('/history',async(req,res)=>{
    try{
        const result=await Historydata.find({}).sort({'_id':-1});
        res.status(200).send({
            'status': 'success',
            'data': result
        })
    }
    catch(e){
        console.log("erro in get '/history' ",e);
        res.status(400).send({
            'status':'failed',
            'message':" Inavlid Request ",
            'error': e
        })
    }
})

app.post("/add_history",async(req,res)=>{
    try{
        req.body.book_name=processing(req.body.book_name);
        req.body.author_name=processing(req.body.author_name);
        req.body.book_id_number=processing(req.body.book_id_number);
        req.body.give_take=processing(req.body.give_take);
        req.body.name_of_user=processing(req.body.name_of_user);
        const addData=new Historydata(req.body);
        const added=await addData.save();
        console.log(added);
        res.status(200).send({
            'status':'success',
            'message': 'data posted successfully',
            'data': added
        })
    }
    catch(e){
        res.status(400).send({
            'status': 'failed',
            'message': 'invalid/insufficient data',
            'error': e
        })
    }
})

app.get("/updateInfo/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await Book.find({_id:id}.sort({'_id':-1}));
        if(data[0].status=="unassigned"){
            res.status(200).send({
                'status': 'success',
                'data': data[0],
                'message': 'Data fetched successfully '
            });
        }
        else{
            res.status(200).send({
                'status':'failed',
                'data': data[0],
                'message': `Assigned to ${data[0].assigned_to}`
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(400).send({
            'status': 'failed',
            'error':e,
            'message': '!!! INVALID ID !!!'
        })
    }
})

app.put("/updateInfo/:id",async(req,res)=>{
    try{
        req.body.book_name=processing(req.body.book_name);
        req.body.author_name=processing(req.body.author_name);
        req.body.book_id_number=processing(req.body.book_id_number);
        req.body.address=processing(req.body.address);
        const result=await Book.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        },{
            new:true,
            useFindAndModify: false
        });
        res.status(202).send({
            'status': 'success',
            'data': result,
            'message': 'Data Updated Successfully'
        })
    }catch(e){
        console.log("ERROR during patch(/assign/:id)",e);
        res.status(400).send({
            'status':'failed',
            'message':" Invalid assign request ",
            'error': e
        });
    }
})

app.delete("/updateInfo/:id",async(req,res)=>{
    try{
        const result=await Book.findByIdAndDelete({_id:req.params.id});
        res.status(202).send({
            'status': 'success',
            'data': result,
            'message': 'Book Deleted Successfully'
        })
    }catch(e){
        res.status(400).send({
            'status':'failed',
            'message':" Invalid Request ",
            'error': e
        });
    }
})

app.listen(PORT,()=>{
    console.log("Server is ready to run 🔥");
})