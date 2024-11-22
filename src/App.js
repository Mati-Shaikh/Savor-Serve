import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginAndSignupComponents/Login";
import SignupPage from "./components/LoginAndSignupComponents/Signup";
import ResetPassword from "./components/LoginAndSignupComponents/ResetPassword";
import LandingPage from "./components/LandingPage/LangingPage";
import Dashboard from "./components/Dashboard/dashboard";
import HomePage from "./components/Home/home";
import ProfileManagement from "./components/Profile/profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ContactUs from "./components/ContactPage/contactPage";
import AdminPage from "./components/LoginAndSignupComponents/Admin"
import AboutUs from "./components/AboutUsPage/aboutus";
import FAQs from "./components/FAQsPage/faqsPage";
import NGO from "./components/NGOPage/ngoPage";
import GrocerySupplierDashboard from "./components/GroceryDashboard/groceryDashboard";
import DonorDashboard from "./components/DonorDashboard/donorDasboard";
import DonateToNGO from './components/Donate/donateToNGOs'
import DonateToSupplier from "./components/Donate/donateToSupplier";
import AdminDashboard from "./components/AdminDashboard/adminDashboard"
import NGORegistrationForm from "./components/NgoRegisteration/ngoProfile";
import AddCauseForm from "./components/NgoRegisteration/addCause";
import ShopDashboard from "./components/ShopComponents/DashboardLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} />

        <Route path="/ngoRegister" element={<NGORegistrationForm />} />
        <Route path="/addCause" element={<AddCauseForm />} />


        <Route path="/ngodashboard" element={<NGO />} />
        <Route path="/grocerydashboard" element={<ShopDashboard/>}/>
        <Route path="/donordashboard" element={<DonorDashboard/>}/>
        <Route path="/donatetongo" element={<DonateToNGO/>}/>
        <Route path="/donatetoSupplier" element={<DonateToSupplier/>}/>

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={ProfileManagement} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
