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
import RoleProtectedRoute from './components/RoleProtectedRoute';
import VaccineStock from './pages/VaccineStock';
import StockHistory from './pages/StockHistory';
import VaccinationCard from './pages/VaccinationCard';
import FacilityPerformance from './pages/FacilityPerformance';
import ImmunizationTrends from './pages/ImmunizationTrends';
import VaccineCoverage from './pages/VaccineCoverage';
import UserManagement from './pages/UserManagement';
import AuditLogs from './pages/AuditLogs';
import RecentActivity from './pages/RecentActivity';


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
  path="/stock"
  element={
    <ProtectedRoute>
      <VaccineStock />
    </ProtectedRoute>
  }
/>


<Route
  path="/stock-history"
  element={
    <ProtectedRoute>
      <StockHistory />
    </ProtectedRoute>
  }
/>



<Route

  path="/reports"
  element={
    <ProtectedRoute>

      <RoleProtectedRoute
        allowedRoles={[1]}
      >

        <Reports />

      </RoleProtectedRoute>

    </ProtectedRoute>
  }
/>

<Route
    path="/vaccination-card"
    element={
        <ProtectedRoute>
            <VaccinationCard />
        </ProtectedRoute>
    }
/>

<Route
    path="/facility-performance"
    element={
        <ProtectedRoute>
            <FacilityPerformance />
        </ProtectedRoute>
    }
/>

<Route
    path="/immunization-trends"
    element={
        <ProtectedRoute>
            <ImmunizationTrends />
        </ProtectedRoute>
    }
/>

<Route
    path="/vaccine-coverage"
    element={
        <ProtectedRoute>
            <VaccineCoverage />
        </ProtectedRoute>
    }
/>

<Route
    path="/audit-logs"
    element={
        <ProtectedRoute>

            <RoleProtectedRoute
                allowedRoles={[1]}
            >

                <AuditLogs />

            </RoleProtectedRoute>

        </ProtectedRoute>
    }
/>

<Route
    path="/users"
    element={
        <ProtectedRoute>

            <RoleProtectedRoute
                allowedRoles={[1]}
            >

                <UserManagement />

            </RoleProtectedRoute>

        </ProtectedRoute>
    }
/>

<Route
    path="/recent-activity"
    element={
        <ProtectedRoute>

            <RecentActivity />

        </ProtectedRoute>
    }
/>

    </Routes>
  );
}

export default App;