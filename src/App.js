import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import { useFireBase } from "./context/firebase";

import Bottombar from "./components/BottomBar/Bottombar";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import PreLoader from "./components/PreLoader/PreLoader";
import DynamicTitle from "./components/SubComponents/DynamicTitle";
// import Cursor from "./components/Cursor/Cursor";

import HomePage from "./components/Pages/HomePage";
import AboutMePage from "./components/Pages/AboutMePage";
import EducationWorkPage from "./components/Pages/EducationWorkPage";
import SkillPage from "./components/Pages/SkillPage";
import ProjectPage from "./components/Pages/ProjectPage";
import ContactPage from "./components/Pages/ContactPage";
import LoginPage from "./components/Pages/LoginPage";
import VisitorStat from "./components/VisitorStat/VisitorStat";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

import AdminPanel from "./components/AdminPanel/AdminPanel";
import EducationTimeLine from "./components/AdminPanel/Components/EducationTimeLine";
import WorkTimeLine from "./components/AdminPanel/Components/WorkTimeLine";
import Skill from "./components/AdminPanel/Components/Skill";
import KnownLanguage from "./components/AdminPanel/Components/KnownLanguage";
import FrontendProject from "./components/AdminPanel/Components/FrontendProject";
import FullstackProject from "./components/AdminPanel/Components/FullstackProject";
import BackendProject  from "./components/AdminPanel/Components/BackendProject";
import LoginDetails from "./components/AdminPanel/Components/LoginDetails";
import AboutDetails from "./components/AdminPanel/Components/AboutDetails";
import SkillImages from "./components/AdminPanel/Components/SkillImage";
import HomeDetails from "./components/AdminPanel/Components/HomeDetails";
import Feedbacks from "./components/AdminPanel/Components/Feedbacks";
import SocialMediaLinks from "./components/AdminPanel/Components/SocialMediaLinks";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// my edits
// import user from "./data";

const App = () => {
  const [loading, setLoading] = useState(true);
  const firebase = useFireBase();
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const { isAuthenticated } = useSelector((state) => state.login);

  const fetchUserData = async () => {
    try {
        // Assuming you have a function in your Firebase context to fetch the user data
        const userDataFromFirebase = await firebase.getData('user'); // Adjust the path as needed
        setUserData(userDataFromFirebase);
        setLoading(false);
        setTimeout(() => {
          console.log('data')
          console.log(userData)
        }, 1000);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // console.log(Cookies.get("isAuthenticatedToken"))
    // if (Cookies.get("isAuthenticatedToken") === undefined) 
    // {
    //   console.log("andar agaya bro")
    //   const expiryTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    //   Cookies.set('isAuthenticatedToken', false, { expires: 1, secure: true, sameSite: 'None', httpOnly: false });
    //   setIsAuthenticated(false);
    // }    
    // let cookieValue = Cookies.get("isAuthenticatedToken");
    // console.log("bhai cookies hai " + cookieValue );
    // alert(process.env.REACT_APP_FIREBASE_API_KEY);
  }, []);

  // useEffect(()=>{
  //   console.log("data is here")
  //   console.log(userData);

  //   setTimeout(() => {
  //     console.log("data2 is here")
  //   console.log(userData);
  //   console.log("data2 home is here")
  //   console.log(userData?.home);
  //   }, 2000);
  // },[userData])


  // useEffect(()=>{
  //   alert(isAuthenticated);
  // },[isAuthenticated])




  return (
    <Router>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          {/* <Cursor /> */}
          <DynamicTitle />
          <ProgressBar />

          <NavBar />

          <Routes>
            <Route path="/" element={<HomePage user={userData} />} />

            <Route
              path="/education-work"
              element={<EducationWorkPage user={userData} />}
            />
            <Route path="/skills" element={<SkillPage user={userData} />} />
            <Route path="/projects" element={<ProjectPage user={userData} />} />
            <Route path="/about-me" element={<AboutMePage user={userData} />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />

              <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>

                                <Route path="/admin" element={<AdminPanel setIsAuthenticated={setIsAuthenticated} />} />
                                <Route path="/update/skills" element={<Skill user={userData} />} />
                                <Route path="/update/skill-images" element={<SkillImages />} />
                                <Route path="/update/social-link" element={<SocialMediaLinks user={userData} />} />
                                <Route path="/update/home-details" element={<HomeDetails />} />
                                <Route path="/update/frontend-project" element={<FrontendProject user={userData} />} />
                                <Route path="/update/fullstack-project" element={<FullstackProject user={userData} />} />
                                <Route path="/update/backend-project" element={<BackendProject user={userData} />} />
                                <Route path="/update/education-timeline" element={<EducationTimeLine user={userData} />} />
                                <Route path="/update/work-timeline" element={<WorkTimeLine user={userData} />} />
                                <Route path="/view/feedbacks" element={<Feedbacks user={userData} />} />
                                <Route path="/update/known-language" element={<KnownLanguage user={userData} />} />
                                <Route path="/update/login-details" element={<LoginDetails />} />
                                <Route path="/update/about-details" element={<AboutDetails />} />
              </Route>

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          <Footer user={userData} />
          <Bottombar />
          <VisitorStat />

          <ToastContainer
            theme="colored"
            position="bottom-right"
            style={{ fontSize: "14px" }}
            autoClose={2000}
          />
        </>
      )}
    </Router>
  );
};

export default App;
