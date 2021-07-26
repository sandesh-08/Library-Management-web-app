import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navbar_Compo=()=>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand >Library Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addBook">Add Book</Nav.Link>
            <Nav.Link href="/updateInfo">Update Info</Nav.Link>
            <Nav.Link href="/unassigned">Available</Nav.Link>
            <Nav.Link href="/assigned">UnAvailable</Nav.Link>
            <Nav.Link href="/take_back">Collect Back</Nav.Link>
            <Nav.Link href="/history">Records</Nav.Link>
            </Nav>
            <Nav>
            {/* <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link> */}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default Navbar_Compo;