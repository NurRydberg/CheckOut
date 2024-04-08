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
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const {cart} = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <ul>
        <a href="/">Products</a>
        <br />
        <a href="/payment"> <FontAwesomeIcon icon={faShoppingCart} />
           {totalItems > 0 && <span>({totalItems})</span>}</a>
        <br />
        <a href="/confirmation">Confirmation</a>
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
        <Navbar />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <h1>{user ? "Inloggad:" + user : "Utloggad"} </h1>
        <LogIn setUser={setUser} />
        <LogOut setUser={setUser} />
        <Register setUser={setUser} />
      </CartProvider>
    </>
  );
};

export default App;
