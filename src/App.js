import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Account from './components/Account';
import Alert from './components/Alert';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { TasksData } from './context/TasksContext';
import HomePage from './components/homePage';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
      setLoading(false);
    })
  },[])
  return (
    <main className="App">
      <Alert />
      {loading?
        <div className='loading'><span></span></div>
      :
      <>
      {/* to check if the user is logged in */}
        {!isLoggedIn ?
          <Account />
        :
        // main app
          <HomePage />
        }
      </>
      }
    </main>
  );
}

export default App;
