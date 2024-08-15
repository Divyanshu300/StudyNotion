import {Routes , Route} from "react-router-dom";
import {useSelector} from "react-redux"

import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { Cart } from "./components/core/Dashboard/Cart";
import  AddCourse  from "./components/core/Dashboard/AddCourse";

import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";


function App() {

  const {user} = useSelector((state) => state.profile);



  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        
        <Route path="/" element = {<Home/>}/>
        
        <Route path="login" element = {<Login/>}/>
        
        <Route path="signup" element = {<Signup/>}/>
        
        <Route path="forgot-password" element = {<ForgotPassword/>}/>
        
        <Route path="verify-email" element = {<VerifyEmail/>}/>
        
        <Route path="about" element = {<About/>}/>
        
        <Route path="update-password/:id" element = {<UpdatePassword/>}/>
        
        
        
        <Route element = {
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>

          <Route path="dashboard/my-profile" element = {<MyProfile/>}/>
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element = {<Cart/>}/>
                <Route path="dashboard/enrolled-courses" element = {<EnrolledCourses/>}/>     
                <Route path="dashboard/edit-course/:courseId" element = {<EditCourse/>}/>     
              </>
            )
          }
          
          
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element = {<AddCourse/>}/>
                <Route path="dashboard/my-courses" element = {<MyCourses/>}/>
              </>
            )
          }
        
        </Route>

        <Route path="*" element={<Error/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
