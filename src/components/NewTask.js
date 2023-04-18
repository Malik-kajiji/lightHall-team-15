import React, { useEffect, useState } from 'react';
import '../styles/NewTask.css';
import { AlertData } from '../context/AlertContext'

const NewTask = () => {
    const { setAlertData } = AlertData();
    // {msg:'hi',type:'error',showen:true}
    const [isShowen,setIsShowen] = useState(true);
    const [formData,setFormData] = useState({title:'',date:'',desc:''});
    const [leftLetters,setLeftLetters] = useState(450);
    function handleChange(e){
        const {name,value} = e.target;
        if(name === 'desc' && value.length <= 450){
            setLeftLetters(450 - value.length);
            setFormData(prev => ({...prev,[name]:value}));
        }else if(name !== 'desc') {
            setFormData(prev => ({...prev,[name]:value}));
        }
    }

    function handleAdd(e){
        e.preventDefault();
        
    }

    function handleCancel(e){
        e.preventDefault();
        setIsShowen(false);
    }

    return (
        <section className={`newTask ${isShowen ? 'active': ''}`}>
            <form className={`taskForm ${isShowen ? 'active': ''}`}>
                <input 
                    type="text" 
                    placeholder='Task Title'
                    name='title'
                    value={formData.title}
                    onChange={(e)=>handleChange(e)}
                    className='title'
                />
                <input 
                    type="date" 
                    placeholder='End Date'
                    name='date'
                    value={formData.date}
                    onChange={(e)=>handleChange(e)}
                    className='date'
                />
                <textarea 
                    type="text" 
                    placeholder='description'
                    name='desc'
                    value={formData.desc}
                    onChange={(e)=>handleChange(e)}
                    className='desc'
                />
                <p className='letters-left'>{leftLetters} letters left</p>
                <button className='C-Btn' onClick={(e)=>handleCancel(e)}>Cancel</button>
                <button className='A-Btn' onClick={(e)=>handleAdd(e)}>Add</button>
            </form>
        </section>
    )
}

export default NewTask