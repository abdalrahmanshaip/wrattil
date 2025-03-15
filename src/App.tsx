import { BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Shared/Sidebar";
import Navbar from "./components/Shared/Navbar"; // Import Navbar


function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar (below the Navbar) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar (absolute so it covers Sidebar header) */}
          <Navbar />

          {/* Page Content (Adds padding to avoid being hidden under Navbar) */}
          <main className="p-6 pt-20 overflow-auto">
            <Routes>
           
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
