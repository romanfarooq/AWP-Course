import { useState, useEffect, useCallback, createContext } from "react";
import PropTypes from "prop-types";
import api from "../axios/api";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);
  const [todo, setTodo] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    completed: false,
  });

  const fetchTodos = useCallback(async () => {
    try {
      const response = await api.getAllTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todo) => {
    try {
      await api.createTodo(todo);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await api.updateTodo(updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const todoContextValue = {
    todos,
    todo,
    update,
    setUpdate,
    setTodo,
    addTodo,
    deleteTodo,
    updateTodo,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
