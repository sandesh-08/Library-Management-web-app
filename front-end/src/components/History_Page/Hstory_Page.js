import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import './History_Page.css';

const RenderBooks=(props)=>{
    return(
        <tr className="table_home">
            <td data-label="Book" className="book_name_home text_validation">{props.book_name}</td>
            <td data-label="Author" className="author_name_home text_validation">{props.author_name}</td>
            <td data-label="Id" className="book_id_number_home text_validation">{props.book_id_number}</td>
            {
                props.give_take.toLowerCase()==='given' &&
                <td data-label="Status" className="status_home text_validation" style={{'color': 'green'}}>{props.give_take}</td>
            }
            {
                props.give_take.toLowerCase()!=='given' &&
                <td data-label="Status" className="status_home text_validation" style={{'color': 'red'}}>{props.give_take}</td>
            }
            <td data-label="User" className="user_name_assigned text_validation">{props.name_of_user}</td>
            <td data-label="Contact" className="history_contact_number text_validation">{props.contact_number}</td>
            <td data-label="Date" className="history_date text_validation">{props.date}</td>
        </tr>
    );
}

const History_Page=()=>{
    const [search_using_book_name,set_search_using_book_name]=useState('');
    const [search_using_author,set_search_using_author]=useState('');
    const [search_using_book_id_number,set_search_using_book_id_number]=useState('');
    const [search_using_give_or_take,set_search_using_give_or_take]=useState('');
    const [search_using_date,set_search_using_date]=useState('');
    const [search_user,set_search_user]=useState('');

    const [dataToshow,setDataToShow]=useState([]);

    useEffect(()=>{
        Axios.get("https://libraryoin.herokuapp.com/history")
        .then((response)=>{
            setDataToShow(response.data.data);
        })
    })

    return(
    <div className="container">
        <h3>Records</h3>
        <div className="filter_home">
            <input className="filter_ip" placeholder="book name....." value={search_using_book_name} onChange={(e)=>set_search_using_book_name(e.target.value)}></input>
            <input className="filter_ip" placeholder="author name....." value={search_using_author} onChange={(e)=>set_search_using_author(e.target.value)}></input>
            <input className="filter_ip" placeholder="copy_id....." value={search_using_book_id_number} onChange={(e)=>set_search_using_book_id_number(e.target.value)}></input>
        </div>
        <div className="filter_home">
            <input className="filter_ip" placeholder="status....." value={search_using_give_or_take} onChange={(e)=>set_search_using_give_or_take(e.target.value)}></input>
            <input className="filter_ip" placeholder="date....." value={search_using_date} onChange={(e)=>set_search_using_date(e.target.value)}></input>
            <input className="filter_ip" placeholder="user....." value={search_user} onChange={(e)=>set_search_user(e.target.value)}></input>
        </div>

        <Table striped bordered hover>

            <thead class="thead-dark">
                <tr>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Id</th>
                    <th>Status</th>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>

            {
                dataToshow.filter((props)=>{
                    if (search_using_book_name.toLowerCase()==="" || props.book_name.toLowerCase().includes(search_using_book_name)){
                        if(search_using_author.toLowerCase()==="" || props.author_name.toLowerCase().includes(search_using_author)){
                            if(search_using_book_id_number.toLowerCase()==="" || props.book_id_number.toLowerCase().includes(search_using_book_id_number)){
                                if(search_using_give_or_take.toLowerCase()==="" || props.give_take.toLowerCase().includes(search_using_give_or_take)){
                                    if(search_using_date.toLowerCase()==="" || props.date.toLowerCase().includes(search_using_date)){
                                        if(search_user.toLowerCase()==="" || props.name_of_user.toLowerCase().includes(search_user)){
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
                    }else{
                        return null ;
                    }
                }).map((props)=>{
                    return (
                        <RenderBooks  book_name={props.book_name} author_name={props.author_name} book_id_number={props.book_id_number} give_take={props.give_take} name_of_user={props.name_of_user} email={props.email} contact_number={props.contact_number} date={props.date} />
                    );
                })
            }
            </tbody>
        </Table>
        
    </div>
)}

export default History_Page;