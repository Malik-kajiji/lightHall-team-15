import React from 'react';
import '../styles/TaskCard.css';
import EditTask from './EditTask';


//change the card styles and icons depending on taskType prop
// the type can be 'waitList' or 'inProgress' or 'completed' or 'expired'
const TaskCard = ({taskType,taskId,taskTitle,taskDesc,TaskEndDate}) => {
    return (
        <>
            <EditTask />
            <article>
                
            </article>
        </>
    )
}

export default TaskCard