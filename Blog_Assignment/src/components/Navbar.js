import '../App.css'
import { Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'


function Navbar() {
    let location = useLocation();

    function backtoIndex(){
        window.location.href="/"
    }

    return (
        <div className="Navbar my-2 mx-5">
            {
                (location.pathname !== "/") ?
                    <div style={{ float: 'left' }}>
                        <Button variant="dark" onClick={()=>backtoIndex()}>Back to index</Button>
                    </div>
                    : null
            }
            <div style={{ display: 'inline-block' }}>
            </div>
            {
                (location.pathname === "/") ?
                    <div style={{ float: 'right' }}>
                        <Link to="/new-post">
                            <Button variant="dark">New Post</Button>
                        </Link>
                    </div>
                    : null
            }

        </div>
    );
}

export default Navbar;
