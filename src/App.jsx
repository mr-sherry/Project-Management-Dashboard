import { Outlet } from "react-router-dom"
import { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import Header from "./Components/Header";


function App() {

  useEffect(() => {
    const projectData = localStorage.getItem('ProjectList');
    const userData = localStorage.getItem('users');

    if (projectData) {
      setProjectList(JSON.parse(projectData));
    }

    if (userData) {
      setUsers(JSON.parse(userData));
    }


    setRestoreData(true);
  }, []);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [userId, setUserId] = useState("user-001");
  const [restoreData, setRestoreData] = useState(false);
  const [projectList, setProjectList] = useState([{
    userIds: "user-001",
    pending: [
    ],
    inProgress: [
    ],
    completed: [
    ]
  }]);



  const newUser = (useridFromR) => {
    setProjectList(prev =>
    ([...prev, {
      userIds: useridFromR,
      pending: [],
      inProgress: [],
      completed: []
    }])
    )
  }


  const addProject = (userId, id, title, description, startDate, status, progress) => {
    setProjectList(prevList =>
      prevList.map(user =>
        user.userIds === userId
          ? {
            ...user,
            [status]: [...user[status], { id, title, description, startDate, status, progress }]
          }
          : user
      )
    );
  };


  const projectsSort = (userId, updatedProjects) => {
    setProjectList(prev => prev.map((user) => (
      user.userIds === userId
        ? {
          ...user,
          ...updatedProjects
        } : user

    )));
  }

  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setLoggedUser(user);
      setUserId(user.userid);
      return true;
    }

    return false;
  };
  useEffect(() => {
    if (loggedUser) {

      setUserId(loggedUser.userid)
    }
  }, [])

  const register = (username, userId, password, email, cPassword) => {
    setUsers(prev => ([...prev, { userName: username, userid: userId, password: password, email: email, cPassword: cPassword }]))
    newUser(userId);

  }

  const logout = () => {
    setLoggedUser(null);
  }

  useEffect(() => {
    if (restoreData) {
      localStorage.setItem('ProjectList', JSON.stringify(projectList));
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    }

  }, [projectList, users, loggedUser])

  return (
    <>
      <UserProvider value={{ login, register, logout, users, loggedUser, setLoggedUser, addProject, projectsSort, projectList, userId }}>
        <Header />
        <Outlet />
      </UserProvider>

    </>
  )
}

export default App