import './App.css'
import React, { useState } from 'react'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { Routes, Route, Navigate, data } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './components/pages/Home'
import ProtectedRoutes from './ProtectedRoutes'
import AuthRedirect from './AuthRedirect'
import Profile from './profile'

function App() {

  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>

      {/* <Profile text={{ name: "Hello" }} data=" World" /> */}

    </>
  )
}

export default App
