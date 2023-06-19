import TodoProvider from "./context/TodoContext";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <TodoProvider>
      <div className="container mx-auto p-3">
        <h1 className="text-2xl text-center font-bold text-blue-600 mb-4">
          Todo App
        </h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
