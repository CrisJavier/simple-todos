import React, { useState } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

const tasks = [
  { _id: 1, text: 'Get Insurance Number from Medquest' },
  { _id: 2, text: 'Finish Experiences for ICS 314' },
  { _id: 3, text: 'Start on' },
];
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};
export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const tasks = useTracker(() =>
      TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
        sort: { createdAt: -1 },
      }).fetch()
  );
  const pendingTasksCount = useTracker(() =>
      TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
      pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;
  return (
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>
                📝️ To Do List
                {pendingTasksTitle}
              </h1>
            </div>
          </div>
        </header>

        <div className="main">
          <TaskForm />
          <div className="filter">
            <button onClick={() => setHideCompleted(!hideCompleted)}>
              {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
          </div>
          <ul className="tasks">
            {tasks.map(task => (
                <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                />
            ))}
          </ul>
        </div>
      </div>
  );
};




