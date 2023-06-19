import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const api = {
  getAllTodos: () => axiosInstance.get("/todos"),
  createTodo: (todo) => axiosInstance.post("/todos", todo),
  updateTodo: (updatedTodo) => axiosInstance.put("/todos", updatedTodo),
  deleteTodo: (id) => axiosInstance.delete(`/todos/${id}`),
};

export default api;
