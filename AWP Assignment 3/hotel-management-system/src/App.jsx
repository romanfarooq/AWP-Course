import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Hotel Management System</h1>
      <p className="mb-4">Please select your role:</p>
      <div className="flex flex-row">
        <Link to="/admin">
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded">
            Admin
          </button>
        </Link>
        <Link to="/customer">
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Customer
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
