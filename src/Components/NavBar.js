import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav className='navbar'>
        <h2>
            <Link to={`/`}>Words Cad</Link>
        </h2>
        <ul className='menu'>
            <li>
                <Link to={`/`} >Home</Link>
            </li>
            <li>
                <Link to={`/create`} className="new-btn" >Cadastrar + </Link>
            </li>
        </ul>        
    </nav>
    </div>
  )
}

export default NavBar