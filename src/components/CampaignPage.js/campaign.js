import React from "react";
import Header from "../LandingPageComponents/Header";
import Footer from "../LandingPageComponents/Footer";
import Campaign from "../LandingPageComponents/Campaign";
import SponsorshipPackages from "../LandingPageComponents/Sponsorship";


const CampaignPage = () => {
  return (
    <div>
      <Header />
      <Campaign/>
      <SponsorshipPackages/>
      
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

export default CampaignPage;
