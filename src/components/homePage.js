import React, { useEffect, useState } from 'react';
import '../styles/home-page-style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  redirect
} from "react-router-dom";
import { BsFilter } from 'react-icons/bs'
import { onSnapshot,doc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebaseConfig';
import TaskCard from './TaskCard';
import NewTask from './NewTask';
import { AlertData } from '../context/AlertContext';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'firebase/auth';

const HomePage = () => {
  const { setAlertData } = AlertData();
  const [newTaskShowen,setNewTaskShowen] = useState(false)
  const [current,setCurrent] = useState('wait-list');
  const [loading,setLoading] = useState(true);
  const [alltasks,setAllTask] = useState({waitList:[],inProgress:[],completed:[],expired:[]})
  function handeNameSort(){
    setAllTask(prev => {
      const sortedWaitList = prev.waitList.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
      const sortedInProgress = prev.inProgress.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
      const sortedCompleted = prev.completed.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
      const sortedExpired = prev.expired.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);

      return {waitList:sortedWaitList,inProgress:sortedInProgress,completed:sortedCompleted,expired:sortedExpired};
    })
    setAlertData({type:'success',showen:true,msg:'tasks sorted successfully'})
  }

  function handleDateSort(){
    setAllTask(prev => {
      const sortedWaitList = prev.waitList.sort((a, b) => a.date > b.date? 1 : -1);
      const sortedInProgress = prev.inProgress.sort((a, b) => a.title.date > b.date ? 1 : -1);
      const sortedCompleted = prev.completed.sort((a, b) => a.title.date > b.date ? 1 : -1);
      const sortedExpired = prev.expired.sort((a, b) => a.date > b.date ? 1 : -1);

      return {waitList:sortedWaitList,inProgress:sortedInProgress,completed:sortedCompleted,expired:sortedExpired};
    })
    setAlertData({type:'success',showen:true,msg:'tasks sorted successfully'})
  }
  function handleLogOut(){
    signOut(auth)
    
  }

  useEffect(()=>{
    const ref = doc(db,'tasks',auth.currentUser.uid);
    onSnapshot(ref,(res)=>{
      setAllTask(res.data())
      setLoading(false)
    })
  },[])
  useEffect(()=>{
    const dateNow = new Date().getTime()
    const ref = doc(db,'tasks',auth.currentUser.uid)
    for(let i =0; i < alltasks.waitList.length ; i++){
      const taskDate = new Date(alltasks.waitList[i].date).getTime()
      if(taskDate <= dateNow){
        const newData = alltasks.waitList.filter((e)=> e.title !== alltasks.waitList[i].title);
        updateDoc(ref,{
          waitList:newData,
          expired:[...alltasks.expired,{title:alltasks.waitList[i].title,date:alltasks.waitList[i].date,desc:alltasks.waitList[i].desc}]})
      };
    }
    for(let i =0; i < alltasks.inProgress.length  ; i++){
      const taskDate = new Date(alltasks.inProgress[i].date).getTime()
      if(taskDate >= dateNow) {
        const newData = alltasks.inProgress.filter((e)=> e.title !== alltasks.inProgress[i].title);
        updateDoc(ref,{
          inProgress:newData,
          expired:[...alltasks.expired,{title:alltasks.inProgress[i].title,date:alltasks.inProgress[i].date,desc:alltasks.inProgress[i].desc}]})
      };
    }
    for(let i =0; i < alltasks.completed.length; i++){
      const taskDate = new Date(alltasks.completed[i].date).getTime()
      if(taskDate >= dateNow) {
        const newData = alltasks.completed.filter((e)=> e.title !== alltasks.completed[i].title);
        updateDoc(ref,{
          completed:newData,
          expired:[...alltasks.expired,{title:alltasks.completed[i].title,date:alltasks.completed[i].date,desc:alltasks.completed[i].desc}]})
      };
    }
  },[alltasks.waitList.length,alltasks.inProgress.length,alltasks.completed.length,alltasks.expired.length])
  return (
    <>
    {loading?
        <div className='loading'><span></span></div>
    :
      <div>
        <Router>
          <NewTask alltasks={alltasks} isShowen={newTaskShowen} setIsShowen={setNewTaskShowen}/>
            <div className="header">
              <div className={`new-task ${newTaskShowen?'current' : ''}`} onClick={()=>setNewTaskShowen(true)}>
                <span className='add-plus'></span>
                <p className="new-task-text">NEW TASK</p>
              </div>
              <div className="sort-dropdown">
                <div className="sort">
                  <p className="sort-text">Sort</p>
                  <span>{BsFilter({})}</span>
                </div>
                <div className="sort-by-name">
                  <p className="sort-by-name-text" onClick={handeNameSort}>By Name</p>
                </div>
                <div className="sort-by-date">
                  <p className="sort-by-date-text" onClick={handleDateSort}>By Date</p>
                </div>
              </div>
            </div>
            <div className="menu">
              <Link to='/'>
                <div className={`wait-list ${current === 'wait-list'?'current' :''}`} onClick={()=>setCurrent('wait-list')}>
                  <p className="button-text">WAIT LIST</p>
                </div>
              </Link>
              <Link to='/inProgress'>
                <div className={`in-progress ${current === 'in-progress'?'current' :''}`}  onClick={()=>setCurrent('in-progress')}>
                  <p className="button-text">IN PROGRESS</p>
                </div>
              </Link>
              <Link to='completed'>
                <div className={`completed ${current === 'completed'?'current' :''}`}  onClick={()=>setCurrent('completed')}>
                  <p className="button-text">COMPLETED</p>
                </div>
              </Link>
              <Link to='expired'>
                <div className={`expired ${current === 'expired'?'current' :''}`}  onClick={()=>setCurrent('expired')}>
                  <p className="button-text">EXPIRED</p>
                </div>
              </Link>
              <Link to='/'>
                <div className={`logOut`}  onClick={handleLogOut}>
                    <p className="button-text">logout</p>
                    <span>{MdLogout({})}</span>
                  </div>
              </Link>
            </div>
              <Routes>
                  <Route 
                  path='/' 
                  element={<>
                  {alltasks.waitList.length <= 0?
                    <h2 className='task-msg'> looks like there is no tasks in the wait list </h2>
                  :
                    <div>
                    {alltasks.waitList.map((e,i)=><TaskCard 
                    alltasks={alltasks}
                    key={i}
                    taskTitle={e.title} 
                    taskDesc={e.desc} 
                    TaskEndDate={e.date} 
                    taskType={'waitList'} />)
                    }
                  </div>

                  }
                  </>}/>
                  <Route 
                      path='/inProgress' 
                      element={<>
                      {alltasks.inProgress.length <= 0 ?
                        <h2 className='task-msg'> looks like there is no tasks under progress </h2>
                      :
                      <div>
                        {alltasks.inProgress.map((e,i)=><TaskCard 
                        alltasks={alltasks}
                        key={i}
                        taskTitle={e.title} 
                        taskDesc={e.desc} 
                        TaskEndDate={e.date} 
                        taskType={'inProgress'} />)
                        }
                      </div>
                      }
                      </>}
                    />
                  <Route 
                      path='/completed' 
                      element={<>
                      {alltasks.completed.length <= 0?
                        <h2 className='task-msg'> looks like there is no completed tasks </h2>
                      :
                      <div>
                        {alltasks.completed.map((e,i)=><TaskCard 
                        alltasks={alltasks}
                        key={i}
                        taskTitle={e.title} 
                        taskDesc={e.desc} 
                        TaskEndDate={e.date} 
                        taskType={'completed'} />)
                        }
                      </div>

                      }
                      </>}
                  />
                  <Route 
                      path='/expired' 
                      element={<>
                        {alltasks.expired.length <= 0?
                          <h2 className='task-msg'> looks like there is no expired tasks </h2>
                          :
                          <div>
                        {alltasks.expired.map((e,i)=><TaskCard 
                        alltasks={alltasks}
                        key={i}
                        taskTitle={e.title} 
                        taskDesc={e.desc} 
                        TaskEndDate={e.date} 
                        taskType={'expired'} />)
                        }
                      </div>
                        }
                      </>}
                  />
              </Routes>
          </Router>
      </div>
    }
    </>
  );
}

export default HomePage;