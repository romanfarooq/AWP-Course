import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";

const AddTodoForm = () => {
  const { todo, update, setUpdate, setTodo, addTodo, updateTodo } = useContext(TodoContext);

  const resetForm = () => {
    setTodo({
      id: "",
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      completed: false,
    });
    setUpdate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new todo object
    const newTodo = {
      id: uuidv4(),
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      completed: false,
    };

    // Call the addTodo function from the parent component
    addTodo(newTodo);

    // Reset the form
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Call the updateTodo function from the parent component
    updateTodo(todo);

    // Reset the form
    resetForm();
  };

  return (
    <div className="flex items-center">
      <div className="w-full p-4">
        <h2 className="text-lg font-medium mb-4">Add Todo</h2>
        <form onSubmit={update ? handleUpdate : handleSubmit}>
          <div className="flex">
            <div className="w-3/5 mr-2">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={todo.title}
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                  className="w-full p-2 rounded shadow-sm"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={todo.description}
                  onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                  }
                  className="w-full p-2 rounded shadow-sm resize-none"
                  rows={3}
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-2/5 ml-2">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    id="dueDate"
                    value={todo.dueDate}
                    onChange={(e) =>
                      setTodo({ ...todo, dueDate: e.target.value })
                    }
                    className="w-full p-2 rounded shadow-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={todo.priority}
                  onChange={(e) =>
                    setTodo({ ...todo, priority: e.target.value })
                  }
                  className="w-full p-2 rounded shadow-sm"
                  required
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between my-5">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              {update ? "Update" : "Add"} Todo
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;
