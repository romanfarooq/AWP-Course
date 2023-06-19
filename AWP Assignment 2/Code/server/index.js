import express from "express";
import cors from "cors";
import { readdir, readFile, writeFile, unlink } from "fs/promises";
import { join } from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /todos - Get all todos
app.get("/todos", async (req, res) => {
  try {
    const files = await readdir("todos");
    const todos = await Promise.all(
      files.map(async (file) => {
        const todo = await readFile(join("todos", file));
        return JSON.parse(todo);
      })
    );

    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: "Todos not found" });
  }
});

// POST /todos - Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { ...todo } = req.body;
    const todoData = JSON.stringify(todo);

    await writeFile(join("todos", `${todo.id}.json`), todoData);

    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    res.status(400).json({ message: "Todo not created" });
  }
});

// PUT /todos - Update a todo
app.put("/todos", async (req, res) => {
  try {
    const { ...todo } = req.body;
    const todoData = JSON.stringify(todo);

    await unlink(join("todos", `${todo.id}.json`));

    await writeFile(join("todos", `${todo.id}.json`), todoData);

    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    res.status(400).json({ message: "Todo not updated" });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await unlink(join("todos", `${id}.json`));

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: "Todo not deleted" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
