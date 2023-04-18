import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import { AlertData } from '../context/AlertContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
//use this link to go to the signUp page 'signup'


const Login = (props) => {
    const { setAlertData } = AlertData()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit =  e => {
        e.preventDefault();
        if(formData.email === '' || formData.password === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else {
            signInWithEmailAndPassword(auth,formData.email,formData.password)
            .then((res)=>setAlertData({type:'success',showen:true,msg:'logged in successfully'}))
            .catch((err) => setAlertData({type:'error',showen:true,msg:err.message}))
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    }


    return (
        <form 
            autoComplete='off'
            onSubmit={handleSubmit}
            className='signupContainer'
        >
            <div>
                <div className='label'>
                    <label htmlFor="email">Email</label>
                </div>
                <div className='input'>
                    <input 
                        type="text" 
                        autoComplete='off'
                        id='email'
                        name='email'
                        placeholder='name@example.com'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <div className='label'>
                    <label htmlFor="password">Password</label>
                </div>
                <div className='input'>
                    <input
                        type='password'
                        autoComplete='off'
                        id='password'
                        name='password'
                        placeholder='****************'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <button>Log In</button>
            </div>
            <div>
                <p>Don't have an account? <Link to='/signup'>Create free account</Link></p>
            </div>

        </form>
    )
}

export default Login