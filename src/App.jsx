import { Outlet } from "react-router-dom"
import Header from "./Components/Header";
import { FirebaseProvider } from "./context/firebase";


function App() {
  return (
    <>
      <FirebaseProvider>
        <Header />
        <Outlet />
      </FirebaseProvider>

    </>
  )
}

export default App