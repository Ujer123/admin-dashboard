import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

// In your Routes:
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/" element={<PrivateRoute element={<Product />} />} />
</Routes>
