"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskResponse {
  data: Task[];
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#3a86ff",
    },
    secondary: {
      main: "#ff006e",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  width: "100%",
  maxWidth: "800px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
}));

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});



const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (!storedToken) return;

      try {
        const response = await axios.get<TaskResponse>(
          "http://localhost:5000/tasks",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    toast.info("Welcome to the Task Manager!");
  }, []);
  
  const addTask = async (task: Omit<Task, "_id" | "completed">) => {
    if (!token) return;

    try {
      const response = await axios.post<Task>(
        "http://localhost:5000/tasks",
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const toggleComplete = async (id: string) => {
    if (!token) return;

    try {
      const task = tasks.find((task) => task._id === id);
      if (!task) return;

      const response = await axios.put<Task>(
        `http://localhost:5000/tasks/${id}`,
        { completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success(
        `Task ${
          response.data.completed ? "completed" : "uncompleted"
        } successfully!`
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id: string) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GradientBackground>
        <StyledContainer>
          <StyledPaper elevation={3}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "primary.main", marginBottom: "1.5rem" }}
            >
              Task Manager
            </Typography>
            <Divider sx={{ marginBottom: "2rem" }} />
            <TaskForm addTask={addTask} token={token} />
            <Divider sx={{ margin: "2rem 0" }} />
            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          </StyledPaper>
        </StyledContainer>
      </GradientBackground>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

export default Home;
