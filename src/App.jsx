import React from 'react';
import { Routes, Route ,Navigate} from 'react-router-dom';
import ProtectedRoute from './components/protectRoute'; 


import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Support from './pages/auth/Support';
import ContactUS from './pages/auth/ContactUs';
import Dashboard from './pages/Admindashboard';
import Userlist from './pages/UserList';
import Gallery from './pages/Gallery';
import AdminProfile from './pages/AdminProfile';
import Post from './pages/Post';
import Product from './pages/Product';
import Appointments from './pages/Appointment';
import AppointmentBill from './pages/AppointmentBill';
import BillPrint from './pages/AppointmentBillPrint';
import ReviewSupport from './pages/ReviewSupport';
import Profile from './pages/profile';
import Feed from './pages/Feed';
import Userbooking from './pages/MyBookig'
import Payment from './pages/Payment';
import ViewBooking from './pages/ViewBooking';
const App = () => {
  return (
    <>
      <Routes>

      <Route path="/" element={<Navigate to="/home" />} />
      
        {/* Admin Page! */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contactus" element={<ContactUS />} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
        <Route path="/userlist" element={<ProtectedRoute allowedRoles={['admin']}><Userlist /></ProtectedRoute>} />
        <Route path="/myprofile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute allowedRoles={['admin']}><Post /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute allowedRoles={['admin']}><Product /></ProtectedRoute>} />
        <Route path="/appointment" element={<ProtectedRoute allowedRoles={['admin']}><Appointments /></ProtectedRoute>} />
        <Route path="/bill" element={<ProtectedRoute allowedRoles={['admin']}><AppointmentBill /></ProtectedRoute>} />
        <Route path="/billprint" element={<ProtectedRoute allowedRoles={['admin']}><BillPrint /></ProtectedRoute>} />
        <Route path="/reviewsupoort" element={<ProtectedRoute allowedRoles={['admin']}><ReviewSupport/></ProtectedRoute>}/>
        {/* user Page! */}
        
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Profile /></ProtectedRoute>} />      
        <Route path="/feed" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Feed /></ProtectedRoute>} />
        <Route path='/mybooking' element={<ProtectedRoute allowedRoles={['user','admin']}><Userbooking/></ProtectedRoute>}/>
        <Route path='/payment' element={<ProtectedRoute allowedRoles={['user','admin']}><Payment/></ProtectedRoute>}/>
        <Route path='/viewbooking' element={<ProtectedRoute allowedRoles={['user','admin']}><ViewBooking/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
