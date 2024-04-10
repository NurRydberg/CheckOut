import { useState } from "react";

interface LogInProps {
    setUser: (user: string) => void;
  }


const LogIn: React.FC<LogInProps> = ({setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    const login = async () => {
        const response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
    
        if (response.status === 200) {
          setUser(data);
          setErrorMessage("");
        } else {
          setUser("");
          setErrorMessage("Fel användarnamn och/eller lösenord. Försök igen.");
          setEmail("");
          setPassword("");
        }
      };
    
    
    return (
        <div>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Log In</button>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
    }

export default LogIn;