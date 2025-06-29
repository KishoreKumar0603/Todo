import './App.css'
import Login from './pages/Login';
import RequireAuth from './Contexts/RequireAuth';

import {createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import OAuthSuccess from './OAuthSuccess';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
      <Route path='/' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

      </>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
