
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'



import Home from './pages/home/Home'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AddTodos from './pages/todos/AddTodos'
import ListTodos from './pages/todos/ListTodos'
import TodoHome from './pages/todos/TodoHome'
import TodoPage from './pages/todos/TodoHome'

const App = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar/>

<div className='pt-12'> 
      <Routes>
      
        {/* PUBLIC ROUTES (No login required)          */}
        {/* ========================================== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-todos" element={<AddTodos/>} />
        <Route path="/todo-page" element={<TodoPage/>} />

        <Route path="/list-todos" element={<ListTodos />} />
        {/* CATCH ALL - Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      <Footer/>

 
    </div>
  )
}

export default App
