//npm install react-router-dom react-bootstrap bootstrap axios react-icons
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
// import AccountDetail from './pages/AccountDetail';
import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryList from './pages/CategoryList';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/accounts"
            element={
              <PrivateRoute>
                <CategoryList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
