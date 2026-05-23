import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './components/ProtectedRoute';

import RegisterChild from './pages/RegisterChild';
import SearchChild from './pages/SearchChild';
import Immunization from './pages/Immunization';
import ImmunizationHistory from './pages/ImmunizationHistory';
import Defaulters from './pages/Defaulters';
import DueVaccines from './pages/DueVaccines';
import Reports from './pages/Reports';


function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/register-child"
  element={
    <ProtectedRoute>
      <RegisterChild />
    </ProtectedRoute>
     }
      />

      <Route
  path="/search-child"
  element={
    <ProtectedRoute>
      <SearchChild />
    </ProtectedRoute>
  }
/>

<Route
  path="/immunization"
  element={
    <ProtectedRoute>
      <Immunization />
    </ProtectedRoute>
  }
/>

<Route
  path="/immunization-history"
  element={
    <ProtectedRoute>
      <ImmunizationHistory />
    </ProtectedRoute>
  }
/>

<Route
  path="/defaulters"
  element={
    <ProtectedRoute>
      <Defaulters />
    </ProtectedRoute>
  }
/>

<Route
  path="/due-vaccines"
  element={
    <ProtectedRoute>
      <DueVaccines />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;