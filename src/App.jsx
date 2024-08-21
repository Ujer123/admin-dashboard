import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Sidebar from './Component/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Message from './pages/Message'; 
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messages" element={<PrivateRoute page={<Message />} />} />
          <Route path="/" element={<PrivateRoute page={<Product />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ page }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div className="flex">
      <Sidebar />
      {page}
    </div>
  ) : (
    <Login />
  );
};

export default App;