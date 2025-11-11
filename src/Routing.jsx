import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import DashboardEmployee from './pages/DashboardEmployee';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import PageHR from "./pages/PageHR";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard-hr"
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <PageHR />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-employee"
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <DashboardEmployee />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
