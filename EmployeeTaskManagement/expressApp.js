
import express from "express";

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Sample employee tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Amit Kumar",
        status: "In Progress",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Test Application",
        assignedTo: "Priya Singh",
        status: "Completed",
        priority: "Low"
    }
];


// GET: Retrieve all employee tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// GET: Retrieve a task by ID
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// POST: Add a new employee task
app.post("/tasks", (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    // Validate required fields
    if (!id || !taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check for duplicate ID
    const existingTask = tasks.find(t => t.id === Number(id));

    if (existingTask) {
        return res.status(400).json({
            message: "Task ID already exists"
        });
    }

    // Create new task
    const newTask = {
        id: Number(id),
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// PUT: Update an existing employee task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    // Validate required fields
    if (!taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Update task details
    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });
});

// DELETE: Remove an employee task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    // Remove task from array
    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start Express server
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});
