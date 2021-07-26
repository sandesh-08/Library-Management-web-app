import React, { useState } from 'react';
import Axios from "axios";
import './Take_back.css';

const Take_back=()=>{

    const [messageShowtoUser,setMessageShowtoUser]=useState('');
    const [color,setcolor]=useState('');
    const [obj,setObj]=useState({
        book_name: '',
        author_name: '',
        book_id_number: '',
        address: ''
    })

    const handleChange = (e)=>{
        const { name ,value} = e.target;
        setObj(prevState => ({
        ...prevState,
        [name]: value
        }));
        console.log(obj);
    }

    const nullify=()=>{
        setObj({
            book_name: '',
            author_name: '',
            book_id_number: '',
            address: ''
        });
    }

    const handleTakeBack=()=>{
        setObj({
            book_name: obj.book_name.toLowerCase(),
            author_name: obj.author_name.toLowerCase(),
            book_id_number: obj.book_id_number.toLowerCase(),
            address: obj.address.toLowerCase()
        })
        Axios.put("https://libraryoin.herokuapp.com/take_back",obj)
        .then((response)=>{
            setMessageShowtoUser(response.data.message);
            if(response.data.status==="success") {
    
                let date = new Date().toLocaleString();
                Axios.post(`https://libraryoin.herokuapp.com/add_history`,{
                    book_name: obj.book_name,
                    author_name: obj.author_name,
                    book_id_number: obj.book_id_number,
                    give_take: 'taken back',
                    name_of_user: response.data.imp_data.assigned_to,
                    email: response.data.imp_data.email,
                    contact_number: response.data.imp_data.contact_number,
                    date: date
                })

                setcolor('green');
                nullify();
            }
            else if(response.data.status==="failed") setcolor('red');
        })
        .catch((e)=>{
            setMessageShowtoUser("Invaid Data  !! No such Book exists");
            setcolor('red');
        })
    }

    return(
    <div>
        <div className="assign_user_section container">
                <h1> Take Book back from User </h1>
                {
                    messageShowtoUser.length > 0 &&
                    <h3 style={{'color': `${color}`}}>{messageShowtoUser}</h3>
                }
                <div>
                    <div className="labelinput_assignbook">
                        <label  className="labelbold">Book Name---- </label>
                        <input className="ipfield_assignbook" type="text" name="book_name" value={obj.book_name} onChange={handleChange}></input>
                    </div>  

                    <div className="labelinput_assignbook">
                        <label  className="labelbold">Author---------- </label>
                        <input className="ipfield_assignbook" type="text" name="author_name" value={obj.author_name} onChange={handleChange}></input>
                    </div>  

                    <div className="labelinput_assignbook">
                        <label  className="labelbold">Book Id--------- </label>
                        <input className="ipfield_assignbook" type="text" name="book_id_number" value={obj.book_id_number} onChange={handleChange}></input>
                    </div>  

                    <div className="labelinput_assignbook">
                        <label  className="labelbold">Adress---------- </label>
                        <input className="ipfield_assignbook" type="text" name="address" value={obj.address} onChange={handleChange}></input>
                    </div>                      
                    <button onClick={handleTakeBack} class="btn btn-success buttonoftakeback"> Take Back </button>
                </div>
        </div>
    </div>
)}

export default Take_back;