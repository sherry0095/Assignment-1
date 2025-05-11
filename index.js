const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON body

// In-memory array to store tasks
let tasks = [
  { id: 1, taskName: "Learn Express.js" },
  { id: 2, taskName: "Learn React.js" },
   { id: 3, taskName: "assignment1" },
    { id: 4, taskName: "project1" },
];

// GET /tasks → return all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /addTask → add new task
app.post("/addTask", (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ error: "taskName is required" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    taskName,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /task/:id → delete task by id
app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
