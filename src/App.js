import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginAndSignupComponents/Login";
import SignupPage from "./components/LoginAndSignupComponents/Signup";
import ResetPassword from "./components/LoginAndSignupComponents/ResetPassword";
import LandingPage from "./components/LandingPage/LangingPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./components/Home/home";
import ProfileManagement from "./components/Profile/profile";
import ContactUs from "./components/ContactPage/contactPage";
import AdminPage from "./components/LoginAndSignupComponents/Admin";
import AboutUs from "./components/AboutUsPage/aboutus";
import FAQs from "./components/FAQsPage/faqsPage";
import NGO from "./components/NGOPage/ngoPage";
import GrocerySupplierDashboard from "./components/GroceryDashboard/groceryDashboard";
import DonorDashboard from "./components/DonorDashboard/donorDasboard";
import DonateToNGO from './components/Donate/donateToNGOs';
import DonateToSupplier from "./components/Donate/donateToSupplier";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";
import NGORegistrationForm from "./components/NgoRegisteration/ngoProfile";
import AddCauseForm from "./components/NgoRegisteration/addCause";
import ShopDashboard from "./components/ShopComponents/DashboardLayout";
import CampaignPage from "./components/CampaignPage.js/campaign";
import Role from "./components/Roles/role";
import AdminVerification from "./components/LoginAndSignupComponents/verifyAdmin";
import VoucherCreation from "./components/Donate/voucherCreation";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/campaign"  element={<CampaignPage/>} />
        <Route path="/roles" element={<Role/>} />
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        {/* <Route path="/verifyAdmin" element={<AdminVerification />} /> */}

        {/* Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute element={AdminPage} />} />
        <Route path="/adminDashboard" element={<ProtectedRoute element={AdminDashboard} />} />
        <Route path="/resetpassword" element={<ProtectedRoute element={ResetPassword} />} />
        
       
        <Route path="/ngoRegister" element={<ProtectedRoute element={NGORegistrationForm} />} />
        <Route path="/addCause" element={<ProtectedRoute element={AddCauseForm} />} />
        <Route path="/ngodashboard" element={<ProtectedRoute element={NGO} />} />
        <Route path="/grocerydashboard" element={<ProtectedRoute element={ShopDashboard} />} />
        <Route path="/donordashboard" element={<ProtectedRoute element={DonorDashboard} />} />
        <Route path="/donatetongo" element={<ProtectedRoute element={DonateToNGO} />} />
        <Route path="/donatetoSupplier" element={<ProtectedRoute element={DonateToSupplier} />} />
        <Route path="/voucherCreation" element={<ProtectedRoute element={VoucherCreation} />} />
        <Route path="/home" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/profile" element={<ProtectedRoute element={ProfileManagement} />} />
      </Routes>
    </Router>
  );
};

export default App;
