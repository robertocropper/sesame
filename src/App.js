import React, { useState, useEffect, createContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { LandingPage } from "./components/website/landing-page";
import { NavBar } from "./components/nav/nav-bar";
import { SignUp } from "./components/auth/signup";
import { Login } from "./components/auth/login";
import { Terms } from "./components/website/terms";
import { Support } from "./components/website/support";
import { Footer } from "./components/nav/footer";
import Showcase from "./components/app/showcase";

export const UserContext = createContext();

export function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/auth/get-user`)
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, []);
 
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="terms" element={<Terms />} />
            <Route path="support" element={<Support />} />
            <Route path="showcase/:uid" element={<Showcase />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    );
  }


export default App;