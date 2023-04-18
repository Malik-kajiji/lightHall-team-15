import React, { useState } from 'react';
import {
    Link, useNavigate
} from "react-router-dom";
import { AlertData } from '../context/AlertContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc,setDoc } from 'firebase/firestore';
//use this link to go to the signUp page 'login'

const SignUp = (props) => {
    const { setAlertData } = AlertData()
    const [ formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConf: ''
    })


    const { email, password, passwordConf } = formData


    const handleSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' || passwordConf === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else {
            createUserWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                setAlertData({type:'success',showen:true,msg:'created account successfully'})
                const docRef = doc(db,'tasks',res.user.uid);
                setDoc(docRef,{waitList:[],inProgress:[],expired:[],completed:[]})
            })
            
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
                        value={email}
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
                        value={password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <div className='label'>
                    <label htmlFor="confirm">Confirm Password</label>
                </div>
                <div className='input'>
                    <input
                        type='password'
                        autoComplete='off'
                        id='confirm'
                        name='passwordConf'
                        placeholder='****************'
                        value={passwordConf}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <button>Create Account</button>
            </div>
            <div>
                <p>Already have an account? <Link to='/'>Log in</Link></p>
            </div>

        </form>
    )
}

export default SignUp