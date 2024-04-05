import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Confirmation from "./Confirmation";
import Payment from "./Payment";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Register from "./Register";
import Products from "./Products";
import "./App.css";



const App = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize", {
        credentials: "include"
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser("");
      }
    }
    authorize();
  }, []);




  

  return (
<>
    
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
      <h1>{user ? "Inloggad:" + user : "Utloggad"} </h1>
      <LogIn setUser={setUser} />
      <LogOut setUser={setUser} />
      <Register setUser={setUser} />


</>
  
  );
};

export default App;
