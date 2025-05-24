import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Landing from './Pages/Landing/Landing.jsx'
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'
import Settings from './Pages/Settings/Settings.jsx'
import UserManagement from './Pages/Users/UserManagement.jsx'
import TaskDetails from './Pages/Tasks/TasksDetails.jsx'
import CreateProject from './Pages/Projects/CreateProject.jsx'
import ProjectDetails from './Pages/Projects/ProjectDetails.jsx'
import ProjectList from './Pages/Projects/ProjectList.jsx'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='landing' element={<Landing />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='settings' element={<Settings />} />
      <Route path='user-management' element={<UserManagement />} />
      <Route path='task-details/:taskId' element={<TaskDetails />} />
      <Route path='create-project' element={<CreateProject />} />
      <Route path='project-details/:projectId' element={<ProjectDetails />} />
      <Route path='project-list' element={<ProjectList />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />

)
