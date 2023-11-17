import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import "./Navbar.css"
import logo from "../Assets/logo_new.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from 'react';
import { HomeContext } from '../../Context/HomeContext';

const Navbar = () => {

  const [click, setClick] = useState(false)

  const [menu, setMenu] = useState("Home");
  const {getTotalCartItems} = useContext(HomeContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'><img src={logo} alt=""/></Link> 
            <Link style={{textDecoration:'none'}} to='/'><p>VASTRA</p></Link>
        </div>
        <ul className={click ? "mobile-nav" : "nav-menu"} onClick={() => setClick(false)}>
            <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none',color: 'black'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none',color: 'black'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none',color: 'black'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none',color: 'black'}} to='/kids'>kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
        </button>
    </div>
  )
}

export default Navbar