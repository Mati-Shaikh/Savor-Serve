import React from 'react';
import Header from './components/Header';
import TaglineAndImage from './TaglineAndImage';
import Topics from './Topics';
import Reviews from './Reviews';
import Features from './components/Features'
import Footer from './components/Footer';
import SubTopics from './SubTopics'

const LandingPage = () => {
    return (
        <>
            <Header />

            <TaglineAndImage />
            <Topics />
            <Reviews />
            <Features />
            <SubTopics />

            <Footer />
        </>
    );
};

export default LandingPage;