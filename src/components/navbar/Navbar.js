import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png'
import '../../reusable.css'
import './Navbar.css'

const Navbar = () => {

    const logOut = () => {
        localStorage.removeItem('O_authDB')
        window.location.reload();
    }

    return (
        <nav>
            <div className='nav-container d-flex justify-content-space-between align-items-center'>
                <Link to={'/examBoard'}><img src={logo} alt="" /></Link>
                <p className='button' onClick={logOut}>logOut</p>
            </div>
        </nav>
    );
}

export default Navbar;
