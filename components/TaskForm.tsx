import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Task {
  title: string;
  description?: string;
  dueDate?: string;
}

interface TaskFormProps {
  addTask: (task: Omit<Task, '_id'>) => Promise<void>;
  token: string | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, token }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() && token) {
      addTask({ title, description, dueDate }).catch(error => console.error('Error adding task:', error));
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={handleTitleChange}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="date"
        label="Due Date"
        value={dueDate}
        onChange={handleDueDateChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
