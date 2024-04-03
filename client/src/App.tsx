import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Confirmation from "./Confirmation";
import Payment from "./Payment";

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

  const register = async () => {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "fakeemail@email.com",
        password: "123456789",
      }),
    });
    const data = await response.json();
    console.log(data);
  };



  const login = async () => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: "fakeemail@email.com",
        password: "123456789",
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
    } else {
      setUser("");
    }
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      setUser("");
    }
  }

  return (
<>
    
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
      <h1>{user ? "Inloggad:" + user : "Utloggad"} </h1>
      <button onClick={register}>Registrera</button>
      <button onClick={login}>Logga in</button>
      <button onClick={logout}>Logga ut</button>


</>
  
  );
};

export default App;
