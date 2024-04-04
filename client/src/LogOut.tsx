interface LogOutProps {
    setUser: (user: string) => void;
    }


const LogOut: React.FC<LogOutProps> = ({setUser}) => {


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
      <button onClick={logout}>Logout</button>

    );
    }
export default LogOut;