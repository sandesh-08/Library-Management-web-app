import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import './Assigned.css';

const RenderBooks=(props)=>{
    return(
        <tr className="table_home">
            <td className="book_name_home" style={{'textTransform': 'capitalize'}}>{props.book_name}</td>
            <td className="author_name_home" style={{'textTransform': 'capitalize'}}>{props.author_name}</td>
            <td className="book_id_number_home" style={{'textTransform': 'capitalize'}}>{props.book_id_number}</td>
            <td className="user_name_assigned" style={{'textTransform': 'capitalize'}}>{props.assigned_to}</td>
        </tr>
    );
}

const Assigned=()=>{
    const [bookData,setBookdata]=useState([]);
    const [search_using_book_name,set_search_using_book_name]=useState('');
    const [search_using_author,set_search_using_author]=useState('');
    const [search_using_book_id_number,set_search_using_book_id_number]=useState('');
    const [search_user_name,set_search_user_name]=useState('');
    useEffect(()=>{
        Axios.get(`https://libraryoin.herokuapp.com/`)
        .then((response)=>{
            setBookdata(response.data.data);
        })
        .catch((e)=>{
            console.log("error in getting home page ",e);
        })
    },[]);

    return(
    <div className="container">
        <div className="container outer_most_home"></div>
            <h3>Unavailable Book's</h3>

            <div className="filter_home">
            <input className="filter_ip" placeholder="book name....." value={search_using_book_name} onChange={(e)=>set_search_using_book_name(e.target.value)}></input>
            <input className="filter_ip" placeholder="author name....." value={search_using_author} onChange={(e)=>set_search_using_author(e.target.value)}></input>
            <input className="filter_ip" placeholder="copy_id....." value={search_using_book_id_number} onChange={(e)=>set_search_using_book_id_number(e.target.value)}></input>
            <input className="filter_ip" placeholder="User_name....." value={search_user_name} onChange={(e)=>set_search_user_name(e.target.value)}></input>
        </div>

        <Table striped bordered hover>
            <thead class="thead-dark">
                <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Id</th>
                <th>User</th>
                </tr>
            </thead>
            <tbody>
            {
                bookData.filter((props)=>{
                    if (search_using_book_name.toLowerCase()==="" || props.book_name.toLowerCase().includes(search_using_book_name.toLowerCase())){
                        if(search_using_author.toLowerCase()==="" || props.author_name.toLowerCase().includes(search_using_author)){
                            if(props.status.toLowerCase()==="assigned"){
                                if(search_using_book_id_number.toLowerCase()==="" || props.book_id_number.toLowerCase().includes(search_using_book_id_number)){
                                    if(search_user_name.toLowerCase()==="" || props.assigned_to.toLowerCase().includes(search_user_name)){
                                        return props;
                                    }else{
                                        return null ;
                                    }
                                }else{
                                    return null ;
                                }
                            }else{
                                return null ;
                            }
                        }else{
                            return null ;
                        }
                    }else{
                        return null ;
                    }
                }).map((props)=>{
                    return(
                        <RenderBooks id={props._id} book_name={props.book_name} author_name={props.author_name} assigned_to={props.assigned_to} book_id_number={props.book_id_number} status={props.status} address={props.address}/>
                    )
                })
            }
            </tbody>
        </Table>
    </div>
)}

export default Assigned;