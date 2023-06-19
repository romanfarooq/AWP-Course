import { useState, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
  const { todos, setTodo, setUpdate, deleteTodo, updateTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleEditClick = (todo) => {
    setTodo(todo);
    setUpdate(true);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "today") {
      const today = new Date();
      return new Date(todo.dueDate).toDateString() === today.toDateString();
    } else if (filter === "week") {
      const today = new Date();
      const nextWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return (
        new Date(todo.dueDate) >= today && new Date(todo.dueDate) <= nextWeek
      );
    } else if (filter === "month") {
      const today = new Date();
      const nextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      return (
        new Date(todo.dueDate) >= today && new Date(todo.dueDate) <= nextMonth
      );
    }
    return true;
  });

  return (
    <div className="px-4">
      <div className="flex items-center mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter:
        </label>
        <select
          id="filter"
          className="p-2 border border-gray-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="flex items-center justify-center font-semibold mb-5">
        <div className="basis-1/12">Completed</div>
        <div className="basis-1/6">Title</div>
        <div className="basis-1/3">Description</div>
        <div className="basis-1/12">Priority</div>
        <div className="basis-1/3">Due Date</div>
      </div>
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center m-10 text-gray-500">No todos found</div>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="flex items-center">
              <div className="basis-1/12">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) =>
                    updateTodo({
                      ...todo,
                      completed: e.target.checked,
                    })
                  }
                />
              </div>
              <div
                className={`basis-1/6 ${todo.completed ? "line-through" : ""}`}
              >
                {todo.title}
              </div>
              <div
                className={`text-gray-500 basis-1/3 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.description}
              </div>
              <div className="basis-1/12">
                <button
                  className={`px-2 py-1 rounded text-sm ${
                    todo.priority === "low"
                      ? "bg-green-500 text-green-950"
                      : todo.priority === "medium"
                      ? "bg-yellow-500 text-yellow-800"
                      : todo.priority === "high"
                      ? "bg-red-400 text-red-950"
                      : ""
                  }`}
                  disabled
                >
                  {todo.priority}
                </button>
              </div>
              <div className="basis-1/6">
                <span>
                  {formatDate(todo.dueDate)}
                </span>
              </div>
              <div className="basis-1/6 space-x-8">
                <button
                  className="rounded-lg px-2 py-1 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleEditClick(todo)}
                >
                  <FaEdit />
                </button>
                <button
                  className="rounded-lg px-2 py-1 bg-red-500 text-white hover:bg-red-600"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
