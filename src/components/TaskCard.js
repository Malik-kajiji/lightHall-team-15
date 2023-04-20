import React, { useState } from 'react';
import '../styles/TaskCard.css';
import EditTask from './EditTask';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { AiOutlineDelete,AiOutlineEdit } from 'react-icons/ai';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { AlertData } from '../context/AlertContext';


//change the card styles and icons depending on taskType prop
// the type can be 'waitList' or 'inProgress' or 'completed' or 'expired'
const TaskCard = ({alltasks,taskType,taskTitle,taskDesc,TaskEndDate}) => {
    const [editShowen,setEditShowen] = useState(false)
    const { setAlertData } = AlertData();
    let color;
    if(taskType === 'waitList'){
        color = '#344054'
    }else if(taskType === 'inProgress'){
        color = '#F1C40F'
    }else if (taskType === 'completed'){
        color = '#2ECC71'
    }else {
        color = '#E74C3C'
    }
    function handleDelete(){
        const newData = alltasks[taskType].filter((e)=> e.title !== taskTitle);
        const ref = doc(db,'tasks',auth.currentUser.uid)
        updateDoc(ref,{[taskType]:newData})
        .then(()=>{
            setAlertData({type:'success',msg:'task deleted successfully',showen:true})
        })
        .catch(err=>{
            setAlertData({type:'error',msg:err.message,showen:true})
        })
    }
    function handleEdit(){
        setEditShowen(true)
    }
    function handleNext(){
        if(taskType === 'waitList'){
            const newData = alltasks[taskType].filter((e)=> e.title !== taskTitle);
            const ref = doc(db,'tasks',auth.currentUser.uid)
            updateDoc(ref,{[taskType]:newData,inProgress:[...alltasks.inProgress,{title:taskTitle,date:TaskEndDate,desc:taskDesc}]})
            .then(()=>{
                setAlertData({type:'success',msg:'task started successfully',showen:true})
            })
            .catch(err=>{
                setAlertData({type:'error',msg:err.message,showen:true})
            })
        }else if(taskType === 'inProgress'){
            const newData = alltasks[taskType].filter((e)=> e.title !== taskTitle);
            const ref = doc(db,'tasks',auth.currentUser.uid)
            updateDoc(ref,{[taskType]:newData,completed:[...alltasks.completed,{title:taskTitle,date:TaskEndDate,desc:taskDesc}]})
            .then(()=>{
                setAlertData({type:'success',msg:'task completed successfully',showen:true})
            })
            .catch(err=>{
                setAlertData({type:'error',msg:err.message,showen:true})
            })
        }
    }
    return (<>
    <EditTask 
        taskType={taskType} 
        Title={taskTitle} 
        desc={taskDesc } 
        date={TaskEndDate} 
        isShowen={editShowen} 
        setIsShowen={setEditShowen} 
        alltasks={alltasks}
    />
        <div className="card" style={{border:`2px solid ${color}`,backgroundColor:color}}>
            <div className="card-section">
                <div className="card-header" style={{border:`2px solid ${color}`,backgroundColor:color}}>
                    <h2 className="card-title">{taskTitle}</h2>
                    <div className="card-buttons">
                        {taskType === 'waitList' || taskType === 'inProgress'?
                            <>
                                <button className="card-button edit" onClick={handleEdit}>{AiOutlineEdit({})}</button>
                                <button className="card-button delete" onClick={handleDelete}>{AiOutlineDelete({})}</button>
                                <button className="card-button next" onClick={handleNext}>{MdKeyboardDoubleArrowRight({})}</button>
                            </>
                        :
                            <>
                                <button className="card-button delete" onClick={handleDelete}>{AiOutlineDelete({})}</button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="card-section">
                <div className="card-body">
                <p>{taskDesc}</p>
                </div>
            </div>
            <div className="card-section">
                <div className="card-footer">
                    <div className="card-footer-section" style={{border:`2px solid ${color}`,backgroundColor:color}}>
                        <p>End Date</p>
                    </div>
                    <div className="card-footer-section" style={{border:`2px solid ${color}`}}>
                        <p>{TaskEndDate}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default TaskCard
