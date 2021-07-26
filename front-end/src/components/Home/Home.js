import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import './Home.css';

const RenderBooks=(props)=>{
    const url= `/assign_user/`;

    return(
        <tr className="table_home">
            <td data-label="Book" className="book_name_home" style={{'textTransform': 'capitalize'}}>{props.book_name}</td>
            <td data-label="Author" className="author_name_home" style={{'textTransform': 'capitalize'}}>{props.author_name}</td>
            <td data-label="ID" className="book_id_number_home" style={{'textTransform': 'capitalize'}}>{props.book_id_number}</td>
            <td data-label="Status" className="status_home" style={{'textTransform': 'capitalize'}}>{props.status}</td>
            {
                props.status==="unassigned" &&
                <td data-label="Assign" style={{'textTransform': 'capitalize'}}>
                    <a href={url+`${props.id}`}>  <p className="assign_user"> Assign User </p>  </a>
                </td>
            }
            {
                props.status==="assigned" &&
                <td data-label="Assign" style={{'color':'red', 'font-weight':'bold', 'letter-spacing': '1px'}}> Assigned </td>
            }
            <td data-label="Shelf" className="address_home" style={{'textTransform': 'capitalize'}}>{props.address}</td>
        </tr>
    );
}

const Home=()=>{
    const [bookData,setBookdata]=useState([]);
    const [search_using_book_name,set_search_using_book_name]=useState('');
    const [search_using_author,set_search_using_author]=useState('');
    const [search_using_status,set_search_using_status]=useState('');
    const [search_using_book_id_number,set_search_using_book_id_number]=useState('');
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
    <div className="container outer_most_home">
        <h3 className="apply_filter_home_head">Apply Filter's</h3>
        <div className="filter_home">
            <input className="filter_ip" placeholder="book name....." value={search_using_book_name} onChange={(e)=>set_search_using_book_name(e.target.value)}></input>
            <input className="filter_ip" placeholder="author name....." value={search_using_author} onChange={(e)=>set_search_using_author(e.target.value)}></input>
            <input className="filter_ip" placeholder="status....." value={search_using_status} onChange={(e)=>set_search_using_status(e.target.value)}></input>
            <input className="filter_ip" placeholder="copy_id....." value={search_using_book_id_number} onChange={(e)=>set_search_using_book_id_number(e.target.value)}></input>
        </div>

        <Table striped bordered hover>

            <thead class="thead-dark">
                <tr>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Assign</th>
                    <th>Shelf</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookData.filter((props)=>{
                        if (search_using_book_name.toLowerCase()==="" || props.book_name.toLowerCase().includes(search_using_book_name.toLowerCase())){
                            if(search_using_author.toLowerCase()==="" || props.author_name.toLowerCase().includes(search_using_author)){
                                if(search_using_status.toLowerCase()==="" || props.status.toLowerCase().includes(search_using_status)){
                                    if(search_using_book_id_number.toLowerCase()==="" || props.book_id_number.toLowerCase().includes(search_using_book_id_number)){
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
                    }).map((props)=>{
                        return(
                            <RenderBooks id={props._id} book_name={props.book_name} author_name={props.author_name} book_id_number={props.book_id_number} status={props.status} address={props.address}/>
                        )
                    })
                }
            </tbody>
        </Table>

    </div>
)}

export default Home;