import React, { useEffect, useState } from 'react';
import Axios from "axios";
import './UpdateDeletePage.css';

const UpdateDeletePage=()=>{

    const url=window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    const [messageShowtoUser,setMessageShowtoUser]=useState('');
    const [color,setcolor]=useState('');
    const [disableButtons,setdisableButtons]=useState(0);
    const [obj,setObj]=useState({
        book_name: '',
        author_name: '',
        book_id_number: '',
        address: ''
    })

    const [preobj,setpreObj]=useState({
        book_name: '',
        author_name: '',
        book_id_number: '',
        address: ''
    })

    const setPreviousVal =()=>{
        setObj(preobj);        
    }
    
    const updateVal =()=>{
        Axios.put(`https://libraryoin.herokuapp.com/updateInfo/${id}`,obj)
        .then((response)=>{
            setMessageShowtoUser(response.data.message);
            setcolor('green');
        })
        .catch((e)=>{
            setMessageShowtoUser("Invalid Updates");
            setcolor('red');
        })  
        setdisableButtons(1);
    }

    const handleDelete =()=>{
        Axios.delete(`https://libraryoin.herokuapp.com/updateInfo/${id}`)
        .then((response)=>{
            setMessageShowtoUser(response.data.message);
            setcolor('green');
        })
        .catch((e)=>{
            setMessageShowtoUser("Invalid Delete Request");
            setcolor('red');
        })
        setdisableButtons(1);
    }

    const handleChange = (e)=>{
        const { name ,value} = e.target;
        setObj(prevState => ({
        ...prevState,
        [name]: value
        }));
    }

    useEffect(()=>{
        Axios.get(`https://libraryoin.herokuapp.com/updateInfo/${id}`)
        .then((response)=>{
            setObj(response.data.data);
            setpreObj(response.data.data);
        })
        .catch((e)=>{
            console.log("error");
        })
        // eslint-disable-next-line
    },[])

    return(
    <div>
        <div className="assign_user_section container">
                <h1> Update Info Or Delete Book </h1>
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

                    {
                        disableButtons===0 &&
                        <div>
                            <div> <button class="btn buttons_updateDelete btn-warning buttonoftakeback" onClick={setPreviousVal} > Set Previous </button> </div>
                            <div> <button class="btn buttons_updateDelete btn-success buttonoftakeback" onClick={updateVal} > Update Value </button> </div>
                            <div> <button class="btn buttons_updateDelete btn-danger buttonoftakeback" onClick={handleDelete} > Delete Book </button> </div>
                        </div>
                    }
                </div>
        </div>
    </div>
)}

export default UpdateDeletePage;