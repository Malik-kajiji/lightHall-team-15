import React, { useEffect, useState } from 'react';
// using the same css file of new task component because they look the same but function differently
import '../styles/NewTask.css';



// the setNewData new data is going to set the state of the task and is take object like this:
// {title:'',desc:'',date:'',id: the same passed id}
// the isShowen takes a bool value so when its true the form should appear
const EditTask = ({Title,desc,date,id,setNewData,isShowen,setIsShowen}) => {
    const [formData,setFormData] = useState({title:'',date:'',desc:''});
    function handleChange(e){
        const {name,value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
    }

    function handleAdd(e){
        e.preventDefault();
    }

    function handleCancel(e){
        e.preventDefault();
        setIsShowen(false);
    }

    useEffect(()=>{
        setFormData({title:Title,date:date,desc:desc});
    },[])
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
                <button className='C-Btn' onClick={(e)=>handleCancel(e)}>Cancel</button>
                <button className='A-Btn' onClick={(e)=>handleAdd(e)}>Save</button>
            </form>
        </section>
    )
}

export default EditTask