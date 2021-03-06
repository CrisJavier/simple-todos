import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';

const tasks = [
  { _id: 1, text: 'Get Insurance Number from Medquest' },
  { _id: 2, text: 'Finish Experiences for ICS 314' },
  { _id: 3, text: 'Start on' },
];

export const App = () => {

  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  return (
      <div>
        <h1>Welcome to Meteor!</h1>
        <TaskForm/>
        <ul>
          {tasks.map(task => <Task key={task._id} task={task}/>)}
        </ul>
      </div>
  );
};




