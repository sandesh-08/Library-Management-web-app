import React, { useState } from 'react';
import Axios from "axios";
import './AddBook.css';

const AddBook=()=>{

    const [messageShowtoUser,setMessageShowtoUser]=useState('');
    const [color,setcolor]=useState('');
    const [obj,setObj]=useState({
        book_name: '',
        author_name: '',
        book_id_number: '',
        status: 'unassigned',
        assigned_to: '',
        email: '',
        contact_number: '',
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
            status: 'unassigned',
            assigned_to: '',
            email: '',
            contact_number: '',
            address: ''
        });
    }

    const handleAddbook=()=>{
        Axios.post("https://libraryoin.herokuapp.com/addBook",obj)
        .then((response)=>{
            setMessageShowtoUser(response.data.message);
            setcolor('green');
            nullify();
        })
        .catch((e)=>{
            setMessageShowtoUser("Invalid Input !!!!");
            setcolor('red');
        })
    }

    return(
    <div>
        <div className="assign_user_section container">
                <h1> Add Book to Data-Base </h1>
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
                    <button onClick={handleAddbook} class="btn btn-success buttonoftakeback"> Add Book </button>
                </div>
        </div>
    </div>
)}

export default AddBook;