import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/AuthContext.tsx";

import Home from "./pages/Home.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";

const App = () => {
  const { authUser, isLoading } = useAuthContext();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return authUser ? children : <Navigate to="/login" />;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changePassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
