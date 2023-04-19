import React from 'react';
import '../styles/TaskCard.css';
import EditTask from './EditTask';


//change the card styles and icons depending on taskType prop
// the type can be 'waitList' or 'inProgress' or 'completed' or 'expired'
const TaskCard = ({taskType,taskId,taskTitle,taskDesc,TaskEndDate}) => {
    return (
        <div className="card">
            <div className="card-section">
                <div className="card-header">
                <h2 className="card-title">Task Title</h2>
                <div className="card-buttons">
                    <button className="card-button edit"><i className="fas fa-edit"></i></button>
                    <button className="card-button delete"><i className="fas fa-trash-alt"></i></button>
                </div>
                </div>
            </div>
            <div className="card-section">
                <div className="card-body">
                <p>Task Information.</p>
                </div>
            </div>
            <div className="card-section">
                <div className="card-footer">
                    <div className="card-footer-section">
                        <p>End Date</p>
                    </div>
                    <div className="card-footer-section">
                        <p>May 31, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskCard
