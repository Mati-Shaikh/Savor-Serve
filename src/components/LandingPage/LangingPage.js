import React from "react";
import Header from "../LandingPageComponents/Header";
import TaglineAndImage from "../LandingPageComponents/TaglineAndImage";
import Topics from "../LandingPageComponents/Topics";
import Reviews from "../LandingPageComponents/Reviews";
import Features from "../LandingPageComponents/Features";
import Footer from "../LandingPageComponents/Footer";
import SubTopics from "../LandingPageComponents/SubTopics";
import FAQs from "../LandingPageComponents/FAQs";
import BlogsAndArticles from "../LandingPageComponents/Blogs";
import HeroSection from "../LandingPageComponents/Hero";
import Overview from "../LandingPageComponents/overview";
import RoleSelector from "../LandingPageComponents/RoleSection";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection/>
      <Overview/>
      <RoleSelector/>
      {/* <TaglineAndImage /> */}
      {/* <Topics /> */}
      {/* <Reviews />
      <Features />
      <SubTopics />
      <FAQs />
      <BlogsAndArticles /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
