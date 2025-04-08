import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom'



const Login = () => {
  //javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log("user form zustand", user)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    //code e = event
    setForm({
      ...form, //คัดลอกข้อมูลเก่า
      [e.target.name]: e.target.value //เปลี่ยนข้อมูลใหม่
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role

      roleRedirect(role)
      toast.success('Login Success')
    }
    catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    }
    else{
      navigate('/user')
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        Email
        <input className="border"
          onChange={handleChange}
          name="email"
          type="email"
        />

        Password
        <input className="border"
          onChange={handleChange}
          name="password"
          type="text"
        />

        <button className="bg-blue-500 rounded-md">Login</button>
      </form>
    </div>
  )
}
export default Login