import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

// Define a type for the task object (reused from TaskItem)
interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// Define the props for the TaskList component
interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <List>
      {tasks?.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </List>
  );
};

export default TaskList;
