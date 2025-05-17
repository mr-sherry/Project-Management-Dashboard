import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Settings from './Pages/Settings/Settings.jsx'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Pages */}
      <Route element={<AuthLayout />}>
        <Route path='landing' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* Protected Pages */}
      <Route element={<MainLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='settings' element={<Settings />} />
        <Route path='user-management' element={<UserManagement />} />
        <Route path='task-details/:taskId' element={<TaskDetails />} />
        <Route path='create-project' element={<CreateProject />} />
        <Route path='project-details/:projectId' element={<ProjectDetails />} />
        <Route path='project-list' element={<ProjectList />} />
      </Route>

      {/* 404 Page */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(

  <App />

)
