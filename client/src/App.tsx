import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Register from "./Register";
import Products from "./Products";
import "./App.css";
import CartProvider, { useCart } from "./context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
 const { cart } = useCart();
 const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

 const renderLoginOrLogout = () => {
    if (user) {
      return <a href="/logout">Log Out</a>;
    } else {
      return <a href="/login">Log In</a>;
    }
 };

 return (
  <nav className="navbar">
    <ul className="nav-links">
      <li><Link to="/">Products</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li>{user ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link>}</li>
      <h1>{user ? `Inloggad: ` + user : `Utloggad` } </h1>
      <li className="payment-link"><Link to="/payment"> <FontAwesomeIcon icon={faShoppingCart} />
         {totalItems > 0 && <span>({totalItems})</span>}</Link></li>
    </ul>
  </nav>
);
};

const App = () => {
 const [user, setUser] = useState<string>("");

 useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize", {
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser("");
      }
    };
    authorize();
 }, []);

 return (
    <>
      <CartProvider>
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/logout" element={<LogOut setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>

      </CartProvider>
    </>
 );
};

export default App;
