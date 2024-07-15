import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider , extendTheme} from '@chakra-ui/react'
import { RouterProvider , Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from './components/Home/Home.jsx'
import Layout from './components/Layout/Layout.jsx'
import Courses from './components/Courses/Courses.jsx';
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import ForgetPassword from './components/Auth/ForgetPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx'
import Contact from './components/Contact/Contact.jsx'
import Request from './components/Request/Request.jsx'
import About from './components/About/About.jsx'
import Subscribe from './components/Payments/Subscribe.jsx'
import PaymentSuccess from './components/Payments/PaymentSuccess.jsx'
import PaymentFail from './components/Payments/PaymentFail.jsx'
import NotFound from './components/Layout/NotFound/NotFound.jsx'
import CoursePage from './components/CoursePage/CoursePage.jsx'
import Profile from './components/Profile/Profile.jsx'
import ChangePassword from './components/Profile/ChangePassword.jsx'
import UpdateProfile from './components/Profile/UpdateProfile.jsx'
import Dashboard from './components/Admin/Dashbaord/Dashboard.jsx'
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse.jsx";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses.jsx";
import Users from "./components/Admin/Users/Users.jsx";


// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })


//so ab ye krne se kya hua ki ab vo right click nahi hone wali 
window.addEventListener("contextmenu",(e)=>{
  e.preventDefault();
  alert("Not Possible!");
})



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} >
        <Route path="/" element={<Home />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path="/course/:id" element={<CoursePage />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/request" element={<Request />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/changepassword" element={<ChangePassword />}/>
        <Route path="/updateprofile" element={<UpdateProfile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />}/>
        <Route path="/Resetpassword/:token" element={<ResetPassword />}/>
                                                    {/* jo bhi reset password token hogaa , backend mai dekhoge kese bnana hai , reset password token generate hoga link mai , link pe click krenge to yha phuchengee es token ki value , hm access kr payengee  */}
        <Route path="/subscribe" element={<Subscribe />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/paymentsuccess" element={<PaymentSuccess />}/>
        <Route path="/paymentfail" element={<PaymentFail />}/>


        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />}/>
        <Route path="/admin/createcourse" element={<CreateCourse />}/>
        <Route path="/admin/courses" element={<AdminCourses />}/>
        <Route path="/admin/users" element={<Users />}/>
        


        
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} /> 
    </ChakraProvider>
  </React.StrictMode>,
)
