import React, {useState,useEffect,useContext,createContext} from "react";
import { onSnapshot,doc,setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { onAuthStateChanged  } from 'firebase/auth';


const Context = createContext();
const TasksContext = ({children})=>{
    const [allData,setAllData] = useState({});

    useEffect(()=>{
        // let removeChage;
        onAuthStateChanged(auth,(res)=>{
            if(res.uid){
                const docRef = doc(db,'tasks',res.uid);
                onSnapshot(docRef,(res)=>{
                    if(res.exists()){
                        setAllData(res.data());
                    }
                })
            } 
        })
    },[])

    return <Context.Provider
        value={{
            allData
        }}
    >
        {children}
    </Context.Provider>
}

export default TasksContext;

export const TasksData = () => useContext(Context)