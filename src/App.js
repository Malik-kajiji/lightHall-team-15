import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Account from './components/Account';
import Alert from './components/Alert';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { TasksData } from './context/TasksContext';

function App() {
  const {allData} = TasksData()
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }
    })
  },[])
  return (
    <main className="App">
      <Alert />
      {/* to check if the user is logged in */}
      {!isLoggedIn ?
        <Account />
      :
      // main app
        <section>
          
        </section>
      }
    </main>
  );
}

export default App;
