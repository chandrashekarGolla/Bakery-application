import React from 'react'
import './Navbar.css'
import { Link} from 'react-router-dom'
import logo from '../Images/logo.jpeg'
import { FaBars } from "react-icons/fa";
import {HiOutlineShoppingCart} from 'react-icons/hi'
const Navbar = () => {
  return (
    <header>
      <div>
      <Link to="/" ><img src={logo} alt="logo" className='logo m-0'></img></Link>
      </div>
      <input type="checkbox" id="menu-bar"></input>
      <label htmlFor="menu-bar"><FaBars size={20}/></label>
      <h6 className=''>Welcome to Sudha Bakers <br></br>
          From our Oven to your door
      </h6>
      <div>
      <nav className='navbar'>
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/cartItems'><HiOutlineShoppingCart size={25}/></Link></li>
        </ul>
      </nav>
      </div>
      
    </header>
  );
};

export default Navbar;

