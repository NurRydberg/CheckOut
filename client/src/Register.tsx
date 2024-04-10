import React, { useState } from "react";

interface RegisterProps {
  setUser: (user: string) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const register = async () => {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    setUser(data); 
  };

  return (
    <div>
      <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <button onClick={register}>Registrera</button>
    </div>
  );
};

export default Register;
