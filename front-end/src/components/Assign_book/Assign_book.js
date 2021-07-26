import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import validator from 'validator';
import './Assign_book.css';

const Assign_book=()=>{

  const url=window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const [messageShow,setMessageShow]=useState("");
  const [color,setColor]=useState("green");

  const [obj,setObj]=useState({
    book_name: '',
    author_name: '',
    book_id_number: '',
    status: '',
    assigned_to: '',
    email: '',
    contact_number: '',
    address: ''
  })
  
  useEffect(()=>{
    Axios.get(`https://libraryoin.herokuapp.com/assign_user/${id}`)
    .then((response)=>{
      setObj(response.data.data);
      if(response.data.status==="failed"){
        setMessageShow(response.data.message);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
    // eslint-disable-next-line
  },[]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setObj(prevState => ({
        ...prevState,
        [name]: value
      }));
      console.log(obj);
    };

    const Assign_Book_To_User=()=>{

      if(obj.assigned_to==='' || obj.email==='' || obj.contact_number===''){
        setMessageShow("Fill All The Required Input's");
        setColor('red');
        return ;
      }

      if(!validator.isEmail(obj.email)){
        setMessageShow("Invalid E-Mail");
        setColor('red');
        return ;
      }

      if(!validator.isMobilePhone(obj.contact_number)){
        setMessageShow("Invalid Contact-Number");
        setColor('red');
        return ;
      }

      obj.status="assigned";
      Axios.put(`https://libraryoin.herokuapp.com/assign/${id}`,obj);
      let date = new Date().toLocaleString();
      Axios.post(`https://libraryoin.herokuapp.com/add_history`,{
        book_name: obj.book_name,
        author_name: obj.author_name,
        book_id_number: obj.book_id_number,
        give_take: 'given',
        name_of_user: obj.assigned_to,
        email: obj.email,
        contact_number: obj.contact_number,
        date: date
      })
      window.location.reload();
    }

    return(
    <div className="assign_user_section container">
          <h1> Assign Book to User </h1>
          <h3 style={{'color': `${color}`}}>{messageShow}</h3>

        <div>
          <div className="labelinput_assignbook">
            <label className="labelbold" >Book Name------ </label>
            <input className="ipfield_assignbook" type="text" name="book_name" value={obj.book_name}></input>
          </div>

          <div className="labelinput_assignbook">
            <label className="labelbold" >Author----------- </label>
            <input className="ipfield_assignbook" type="text" name="author_name" value={obj.author_name}></input>
          </div>

          <div className="labelinput_assignbook">
            <label className="labelbold" >Book Id---------- </label>
            <input className="ipfield_assignbook" type="text" name="book_id_number" value={obj.book_id_number}></input>
          </div>

          
          {messageShow.length !== 0 &&
            <div>
              <div className="labelinput_assignbook">
                <label className="labelbold" >Assigning to-----  </label>
                <input className="ipfield_assignbook" type="text" name="assigned_to" value={obj.assigned_to}></input>
              </div>

              <div className="labelinput_assignbook">
                <label className="labelbold" >Email------------- </label>
                <input className="ipfield_assignbook" type="text" name="email" value={obj.email}></input>
              </div>

              <div className="labelinput_assignbook">
                <label className="labelbold" >Contact Number- </label>
                <input className="ipfield_assignbook" type="text" name="contact_number" value={obj.contact_number}></input>
              </div>
            </div>
          }

          {messageShow.length === 0 &&
            <div>
              <div className="labelinput_assignbook">
                <label className="labelbold" >Assigning to-----  </label>
                <input className="ipfield_assignbook" type="text" name="assigned_to" onChange={handleChange} value={obj.assigned_to}></input>
              </div>
              
              <div className="labelinput_assignbook">
                <label className="labelbold" >Email------------- </label>
                <input className="ipfield_assignbook" type="text" name="email" onChange={handleChange} value={obj.email}></input>
              </div>
              
              <div className="labelinput_assignbook">
                <label className="labelbold" >Contact Number- </label>
                <input className="ipfield_assignbook" type="text" name="contact_number" onChange={handleChange} value={obj.contact_number}></input>
              </div>
          
              <Button onClick={Assign_Book_To_User}> Assign to user </Button>
            </div>
          }
          </div>
    </div>
)}

export default Assign_book;