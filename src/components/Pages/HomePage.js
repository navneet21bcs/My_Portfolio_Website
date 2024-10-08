import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Banner from "../Banner/Banner";
import Skills from "../Skills/Skills";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import AboutMe from "../AboutMe/AboutMe";
import EducationWork from "../EducationWork/EducationWork";
import { useLocation } from "react-router-dom";

const HomePage = ({user}) => {

    return (
        <>
            <Banner 
                homeDetails={user.home}
            />
            <AboutMe
                aboutDetails={user.about}
                languagesKnown={user.languagesKnown}
            />
            <EducationWork
                educationTimeline={user.educationTimeline}
                workTimeline={user.workTimeline}
            />
            <Skills 
                skills={user.skills} 
                skillImages={user.skillsCubeImg} 
            />
            <Projects
                frontendProjects={user.frontendProjects}
                fullstackProjects={user.fullstackProjects}
                backendProjects={user.backendProjects}
            />
            <Contact />
        </>
    );
};

export default HomePage;
