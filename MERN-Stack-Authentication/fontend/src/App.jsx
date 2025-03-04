import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import components
import Navbar from './components/Navbar'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginFrom'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [ isAuthenticated, setAuth] = useState(!!localStorage.getItem('token'))

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm setAuth={setAuth} />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
