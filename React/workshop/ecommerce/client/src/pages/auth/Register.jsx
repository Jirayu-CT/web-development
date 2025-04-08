import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Register = () => {
  //javascript
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    //code e = event
    setForm({
      ...form, //คัดลอกข้อมูลเก่า
      [ e.target.name ]: e.target.value //เปลี่ยนข้อมูลใหม่
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(form.password !== form.confirmPassword) {
      toast('Confirm Password is not match')
      return
    }
    console.log(form)

    //Send to server
    try {
      const res = await axios.post('http://localhost:3000/api/register', form)
      console.log(res)
      toast.success(res.data)
    }
    catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (
    <div>
      Register
      <form onSubmit={ handleSubmit }>
        Email
        <input className="border"
        onChange={ handleChange }
          name="email"
          type="email"
        />

        Password
        <input className="border"
        onChange={ handleChange }
          name="password"
          type="text"
        />

        Confirm Password
        <input className="border"
        onChange={ handleChange }
          name="confirmPassword"
          type="text"
        />

        <button className="bg-blue-500 rounded-md">Register</button>
      </form>
    </div>
  )
}
export default Register