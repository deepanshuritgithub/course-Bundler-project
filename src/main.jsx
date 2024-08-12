import React, { useEffect } from 'react'
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
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import store from './redux/store.js'
import toast,{Toaster} from "react-hot-toast";
import { loadUser } from './redux/actions/user.js'
// import ProtectedRoute from './components/Layout/ProtectedRoute.jsx'
import {ProtectedRoute} from "protected-route-react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}



const theme = extendTheme({ colors })

//so ab ye krne se kya hua ki ab vo right click nahi hone wali inspect 
window.addEventListener("contextmenu",(e)=>{
  e.preventDefault();
  alert("Not Possible!");
})


const ToastNotification =() =>{
  
  const {error, message } = useSelector(state => state.user)
  const dispatch = useDispatch();
  
  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch({type:'clearError'}); //state mai se clear kr dega vo error ko if any error occurs 
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'});//state mai se clear kr dega vo message ko if any message occurs
    }
  
  },[dispatch,error , message])

}



const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user , loading } = useSelector((state) => state.user);
  

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={  <Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CoursePage user={user} />
          </ProtectedRoute>
          }
          />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>  
                      {/* so agr login hai user, to profile wala dikhegaa  */}
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
        path="/changepassword" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ChangePassword />
          </ProtectedRoute>
        } 
          />
        <Route 
        path="/updateprofile" 
        element={ 
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UpdateProfile user={user} />
          </ProtectedRoute>
        } 
          />
        <Route 
        path="/login"
        element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/Profile">
            <Login />
        </ProtectedRoute>
        // so jab login nahi hai tab dikhegaa ye wala route, or agr login hai to redirect kr dengee ye wala profile route pe 
        }
      />
        <Route path="/register" element={
          <ProtectedRoute 
          isAuthenticated={!isAuthenticated}
          redirect="/Profile"
          >
              {/*     //so ab agr login nahi hai to dikhana hai ye wala route , or agr login hai to redirect kra denge hm profile pe     */}
              <Register /> 
          </ProtectedRoute>
        } />
        
        <Route 
        path="/forgetpassword" 
        element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
              <ForgetPassword />
          </ProtectedRoute>
        } 
        />
        <Route path="/resetpassword/:token" element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
            <ResetPassword />
          </ProtectedRoute>  

          } />

        <Route 
        path="/subscribe" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Subscribe user={user} />
          </ProtectedRoute>
        } />

        <Route path="*" element={
            <NotFound />
          } 
          />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute 
            adminRoute={true} 
            isAuthenticated={isAuthenticated} 
            redirect="/Profile" 
            isAdmin={user && user.role ==="admin"}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/createcourse"
          element={
            <ProtectedRoute
            isAuthenticated={isAuthenticated}
            adminRoute={true} 
            redirect="/Profile" 
            isAdmin={user && user.role ==="admin"}
            >
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute 
            adminRoute={true} 
            redirect="/Profile" 
            isAdmin={user && user.role ==="admin"}
            isAuthenticated={isAuthenticated}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute  
            adminRoute={true} 
            redirect="/Profile" 
            isAdmin={user && user.role ==="admin"} 
            isAuthenticated={isAuthenticated}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return (
    <>
    
      <RouterProvider router={router} />
      <ToastNotification />
      <Toaster />
    
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    

  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
    </ReduxProvider>  
  </React.StrictMode>
);








// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<Layout />} >
//         <Route path="/" element={<Home />}/>
//         <Route path="/courses" element={<Courses />}/>
//         <Route path="/course/:id" element={<CoursePage />}/>
//         <Route path="/contact" element={<Contact />}/>
//         <Route path="/request" element={<Request />}/>
//         <Route path="/about" element={<About />}/>
//         <Route 
//         path="/profile" 
//         element={
//           <ProtectedRoute isAuthenticated={isAuthenticated}>
//             <Profile />  
//           </ProtectedRoute>
//           }
//           />
//         <Route path="/changepassword" element={<ChangePassword />}/>
//         <Route path="/updateprofile" element={<UpdateProfile />}/>
//         <Route path="/login" element={<Login />}/>
//         <Route path="/register" element={<Register />}/>
//         <Route path="/forgetpassword" element={<ForgetPassword />}/>
//         <Route path="/Resetpassword/:token" element={<ResetPassword />}/>
//                                                     {/* jo bhi reset password token hogaa , backend mai dekhoge kese bnana hai , reset password token generate hoga link mai , link pe click krenge to yha phuchengee es token ki value , hm access kr payengee  */}
//         <Route path="/subscribe" element={<Subscribe />}/>
//         <Route path="*" element={<NotFound />}/>
//         <Route path="/paymentsuccess" element={<PaymentSuccess />}/>
//         <Route path="/paymentfail" element={<PaymentFail />}/> 

//         {/* Admin Routes */}
//         <Route path="/admin/dashboard" element={<Dashboard />}/>
//         <Route path="/admin/createcourse" element={<CreateCourse />}/>
//         <Route path="/admin/courses" element={<AdminCourses />}/>
//         <Route path="/admin/users" element={<Users />}/>
        
//     </Route>
//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ReduxProvider store={store} >
//       <ChakraProvider theme={theme}>
//         <RouterProvider router={router} />
//         <ToastNotification /> 
//       </ChakraProvider>
//     </ReduxProvider>
//     <Toaster />
//   </React.StrictMode>, //strict mode ese hi rhene denge kyuki ye production mai deploy krne ke baad kaam nahi krta , vo jo 2 baar aata hi state mai request ka ese se aata hai 
// )
