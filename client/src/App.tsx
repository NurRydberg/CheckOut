import { useState } from "react";

const App = () => {
  const [user, setUser] = useState<string>("");

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

  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <h1>{user ? "Inloggad:" + user : "Utloggad"} </h1>
      <button onClick={register}>Registrera</button>

      <button onClick={handlePayment}>Show me the money</button>
    </>
  );
};

export default App;
