import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

// Define a type for the task object
interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// Define the props for the TaskItem component
interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={() => deleteTask(task._id)}>
            <Delete />
          </IconButton>
        </>
      }
    >
      <Checkbox
        checked={task.completed}
        onChange={() => toggleComplete(task._id)}
        edge="start"
      />
      <ListItemText
        primary={task.title}
        secondary={task.description || 'No Description'}
      />
    </ListItem>
  );
};

export default TaskItem;
