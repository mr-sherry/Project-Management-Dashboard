import { Outlet } from "react-router-dom"
import { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { FirebaseProvider } from "./context/firebase";


function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));

  const login = (email, password) => {
    console.log("🚀 ~ login ~ password:", password)
    console.log("🚀 ~ login ~ email:", email)
    setLoggedUser({ email, password })
  };

  const logout = () => {
    setLoggedUser(null);
  }

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }, [loggedUser])

  return (
    <>
      <UserProvider value={{ login, logout, loggedUser, setLoggedUser, }}>
        <FirebaseProvider>
          <Header />
          <Outlet />
        </FirebaseProvider>
      </UserProvider>

    </>
  )
}

export default App