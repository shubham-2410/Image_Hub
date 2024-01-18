import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/updatePassword";
import DashBoard from './pages/DashBoard';
import PrivateRoute from "./components/PrivateRoute";
import MyGallery from "./pages/MyGallery";
import ImageDetails from "./components/ImageDetails";

function App() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-blue-800 min-h-screen" >

      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />}></Route>

        <Route path="/dashboard" element={
          <PrivateRoute> <DashBoard /> </PrivateRoute>
        }></Route>

        <Route path="/my-gallery" element={
          <PrivateRoute> <MyGallery /> </PrivateRoute>
        }></Route>

        <Route path="/my-gallery/details/:id" element={
          <PrivateRoute> <ImageDetails /> </PrivateRoute>
        }></Route>

      </Routes>

    </div>
  );
}

export default App;
