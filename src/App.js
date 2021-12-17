import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React from "react";
import About from "./Components/About";
import "./index.css";
import Tasks from "./Components/Tasks";

import { useState } from "react";
import AddTask from "./Components/AddTask";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: "Go to College",
      day: "Jan 5th at 10AM",
      reminder: true
    },
    {
      id: 2,
      text: "Go to meet friends",
      day: "Jan 8th at 9pm",
      reminder: false
    },
    {
      id: 3,
      text: "Go for shopping",
      day: "Jan 11th at 2:00pm",
      reminder: true
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(true);
  //delete task
  const deleteTask = (id) => {
    // console.log("delete", id)
    setTask(tasks.filter((task) => task.id !== id));
  };

  //onToggle change reminder
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTask([...tasks, newTask]);
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}

                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No  Task to Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
