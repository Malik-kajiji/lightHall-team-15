import React from 'react';
import './home-page-style.css';

const HomePage = () => {
  return (
    <div>
      <div className="header">
        <div className="new-task">
          <img src="./homePageIcons/plus-circle-fill.svg" className="new-task-image" />
          <p className="new-task-text">NEW TASK</p>
        </div>
        <div className="user-tasks">
          <p className="user-tasks-text">USERNAME'S TASKS</p>
        </div>
        <div className="sort-dropdown">
          <div className="sort">
            <p className="sort-text">Sort</p>
            <img src="./homePageIcons/sort-vector.svg" className="sort-image" />
          </div>
          <div className="sort-by-name">
            <p className="sort-by-name-text">By Name</p>
          </div>
          <div className="sort-by-date">
            <p className="sort-by-date-text">By Date</p>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="wait-list">
          <p className="button-text">WAIT LIST</p>
        </div>
        <div className="in-progress">
          <p className="button-text">IN PROGRESS</p>
        </div>
        <div className="completed">
          <p className="button-text">COMPLETED</p>
        </div>
        <div className="expired">
          <p className="button-text">EXPIRED</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;