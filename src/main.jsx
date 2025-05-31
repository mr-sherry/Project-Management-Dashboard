import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Landing from './Pages/Landing/Landing.jsx'
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'
import Settings from './Pages/Settings/Settings.jsx'
import CreateProject from './Pages/Projects/CreateProject.jsx'
import ProjectDetails from './Pages/Projects/ProjectDetails.jsx'
import ProjectList from './Pages/Projects/ProjectList.jsx'
import Profile from './Pages/Users/Profile.jsx'
import ProfileSetup from './Pages/ProfileSetup/ProfileSetup.jsx'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Landing />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='settings' element={<Settings />} />
      <Route path='profile' element={<Profile />} />
      <Route path='create-project' element={<CreateProject />} />
      <Route path='project-details/:projectId' element={<ProjectDetails />} />
      <Route path='project-list' element={<ProjectList />} />
      <Route path='profile-setup' element={<ProfileSetup />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />

)
