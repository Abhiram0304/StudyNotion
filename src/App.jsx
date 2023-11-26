import { Routes , Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Commons/Navbar";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings";
import OpenRoute from './components/main/OpenRoute';
import PrivateRoute from './components/main/PrivateRoute';
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import Cart from './components/Dashboard/Cart/Cart';
import { ACCOUNT_TYPE } from "./utilities/constants";
import AddCourse from "./components/Dashboard/AddCourse/AddCourse";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] font-inter overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/verifyEmail" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path="/forgotPassword" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/updatePassword/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path="/resetPasswordSuccess" element={<OpenRoute><ResetPasswordSuccess /></OpenRoute>} />
        <Route element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>}>

            <Route path="/dashboard/myProfile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            
            {
              ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolledCourses" element={<EnrolledCourses />} />
                  <Route path="/dashboard/cart" element={<Cart />} />
                </>
              )
            }

            {
              ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/addCourse" element={<AddCourse />}/>
                </>
              )
            }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
