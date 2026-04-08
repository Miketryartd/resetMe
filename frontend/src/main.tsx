import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Routes, BrowserRouter, Route } from "react-router"
import HomePage from './Pages/HomePage.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import Signup from './Pages/Signup.tsx'
import Signin from './Pages/Signin.tsx'
import ProtectedRoute from './Middleware/ProtectedRoute.tsx'
import Overview from './Pages/Overview.tsx'
import UserDashboard from './Pages/UserDashboard.tsx'
import AIDashboard from './Pages/AIDashboard.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
<Routes>
<Route path="/" element={<App />} />
<Route path="/Home" element={<HomePage />} />


<Route path="/Dashboard" element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  } />



<Route path="/Admin" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />

  
<Route path="/AI-insights" element={
    <ProtectedRoute>
      <AIDashboard />
    </ProtectedRoute>
  } />

<Route path="/Overview" element={
    <ProtectedRoute>
      <Overview />
    </ProtectedRoute>
  } />



<Route path='/Signup' element={<Signup/>}></Route>
<Route path='/Signin' element={<Signin/>}></Route>

</Routes>
    </BrowserRouter>

  </StrictMode>,
)
