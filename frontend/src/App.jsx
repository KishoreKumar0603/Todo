import './App.css'
import Login from './pages/Login';

import {createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
