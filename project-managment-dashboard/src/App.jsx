import { Outlet } from "react-router-dom"
import { UserProvider } from "./context/UserContext";
import { useState } from "react";
import Header from "./Components/Header";



function App() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [projectList, setProjectList] = useState({
    pending: [
      { id: "1", title: "Wireframe Homepage", description: "Create basic layout for landing and login pages." }
    ],
    inProgress: [
      { id: "2", title: "Develop Login System", description: "Implement authentication flow with validation." }
    ],
    completed: [
      { id: "4", title: "Setup Project Repo", description: "Initialize GitHub repo and push boilerplate code." },
      { id: "4", title: "Setup Project Repo", description: "Initialize GitHub repo and push boilerplate code." }
    ]
  })
  console.log("🚀 ~ App ~ projectList:", projectList)

  const project = (id, title, description) => {
    setProjectList(prev => ({ ...prev, pending: [...prev, { id, title, description }] }))
  }
  const projectsSort = (projects) => {
    setProjectList(projects);
  }



  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setLoggedUser(user);
      return true;
    }

    return false;
  };


  const register = (username, password, email, cPassword) => {
    setUsers(prev => ([...prev, { userName: username, password: password, email: email, cPassword: cPassword }]))
  }

  const logout = () => {
    setLoggedUser(null);
  }

  return (
    <>
      <UserProvider value={{ login, register, logout, users, loggedUser, setLoggedUser, project, projectsSort, projectList }}>
        <Header />
        <Outlet />
      </UserProvider>

    </>
  )
}

export default App