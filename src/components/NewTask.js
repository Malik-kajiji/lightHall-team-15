import React, { useEffect, useState } from 'react';
import '../styles/NewTask.css';
import { AlertData } from '../context/AlertContext'
import { doc,updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const NewTask = ({alltasks,isShowen,setIsShowen}) => {
    const { setAlertData } = AlertData();
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({title:'',date:'',desc:''});
    const [leftLetters,setLeftLetters] = useState(450);
    function addValid(){
        return (formData.title !== '' && formData.date !== '' && formData.desc !== '')
    }

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
        if(addValid()){
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
                setLoading(true)
                const ref = doc(db,'tasks',auth.currentUser.uid)
                updateDoc(ref,{waitList:[...alltasks.waitList,formData]})
                .then(()=>{
                    setAlertData({type:'success',msg:'task added successfully',showen:true})
                    setFormData({title:'',date:'',desc:''})
                    setIsShowen(false)
                })
                .catch(err=>{
                    setAlertData({type:'error',msg:err.message,showen:true})
                })
                .finally(()=>{
                    setLoading(false)
                })
            }
        }
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
                <button className={`A-Btn ${addValid()? '':'disabled'} ${loading? 'clicked':''}`} onClick={(e)=>handleAdd(e)}>Add</button>
            </form>
        </section>
    )
}

export default NewTask