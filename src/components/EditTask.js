import React, { useEffect, useState } from 'react';
// using the same css file of new task component because they look the same but function differently
import '../styles/NewTask.css';
import { doc,updateDoc} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { AlertData } from '../context/AlertContext';



// the setNewData new data is going to set the state of the task and is take object like this:
// {title:'',desc:'',date:''}
// the isShowen takes a bool value so when its true the form should appear
const EditTask = ({taskType,Title,desc,date,isShowen,setIsShowen,alltasks}) => {
    const { setAlertData } = AlertData();
    const [formData,setFormData] = useState({title:'',date:'',desc:''});

    function saveValid(){
        return (formData.title !== Title || formData.date !== date || formData.desc !== desc)
    }

    function handleChange(e){
        const {name,value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
    }

    function handleAdd(e){
        e.preventDefault();
        if(saveValid()){
            let bool = false;
            for(let i =0; i < alltasks.waitList.length && !bool ; i++){
                if(alltasks.waitList[i].title === formData.title) bool = true;
            }
            for(let i =0; i < alltasks.inProgress.length && !bool ; i++){
                if(alltasks.inProgress[i].title === formData.title) bool = true;
            }
            for(let i =0; i < alltasks.completed.length && !bool ; i++){
                if(alltasks.completed[i].title === formData.title) bool = true;
            }
            for(let i =0; i < alltasks.expired.length && !bool ; i++){
                if(alltasks.expired[i].title === formData.title) bool = true;
            }

            if(bool){
                setAlertData({type:'warrning',msg:'there is already task with this title',showen:true})
            }else {
                const ref = doc(db,'tasks',auth.currentUser.uid)
                const newData = alltasks[taskType].filter(e => e.title !== Title)
                updateDoc(ref,{[taskType]:[...newData,formData]})
                .then(()=>{
                    setIsShowen(false);
                    setAlertData({type:'success',showen:true,msg:'task updated successfully'})
                })
                .catch(err =>{
                    setAlertData({type:'error',showen:true,msg:err.message})
                })
            }
        }
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
                <button className={`A-Btn ${saveValid()? '' : 'disabled'}`} onClick={(e)=>handleAdd(e)}>Save</button>
            </form>
        </section>
    )
}

export default EditTask