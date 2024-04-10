import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";




const Navbar = ({ user }) => {
    const { cart } = useCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
   
   
    return (
     <nav className="navbar">
       <ul className="nav-links">
         <li><Link to="/">Products</Link></li>
         {!user && <li><Link to="/register">Register</Link></li>}
         <li>{user ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link>}</li>
         <h4>{user ? `Welcome ` + user.email : `Not logged in` } </h4>
       </ul>
       <li className="payment-link">
  <Link to="/payment" style={{ textDecoration: 'none', color: '#333' }}>
    <FontAwesomeIcon icon={faShoppingCart} />
    {totalItems > 0 && <span> Items in cart: {totalItems}</span>}
  </Link>
</li>
     </nav>
   );
   };

   export default Navbar;