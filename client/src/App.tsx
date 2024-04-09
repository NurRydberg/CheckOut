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
import Navbar from "./Navbar";

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
          <Route path="/payment" element={<Payment user={user}/>} />
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
