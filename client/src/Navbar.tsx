import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";




const Navbar = ({ user }) => {
    const { cart } = useCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
   
    // const renderLoginOrLogout = () => {
    //    if (user) {
    //      return <a href="/logout">Log Out</a>;
    //    } else {
    //      return <a href="/login">Log In</a>;
    //    }
    // };
   
    return (
     <nav className="navbar">
       <ul className="nav-links">
         <li><Link to="/">Products</Link></li>
         {!user && <li><Link to="/register">Register</Link></li>}
         <li>{user ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link>}</li>
         <h1>{user ? `Inloggad: ` + user.email : `Utloggad` } </h1>
         <li className="payment-link"><Link to="/payment"> <FontAwesomeIcon icon={faShoppingCart} />
            {totalItems > 0 && <span>({totalItems})</span>}</Link></li>
       </ul>
     </nav>
   );
   };

   export default Navbar;