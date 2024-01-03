import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUserIP } from './utils/userIPModule';
import { FrontPageStaticContainer } from './containers/FrontPageStaticContainer'
import { StaticElementContainer } from "./containers/StaticElementContainer";
import { CreatePasswordStaticElementContainer } from "./containers/CreatePasswordStaticElementContainer";
import { SignInFrontPageContainer } from "./containers/SignInFrontPageContainer";
import { MockMailContainer } from "./containers/MockMailContainer";
import { CreateAccountContainer } from "./containers/CreateAccountContainer";
import { BirthdayAndGenderContainer } from "./containers/BirthdayAndGenderContainer";
import { ChooseYourGmailAddressContainer } from "./containers/ChooseYourGmailAddressContainer";
import { CreatePasswordContainer } from "./containers/CreatePasswordContainer";
import { ConfirmYoureNotARobotContainer } from "./containers/ConfirmYoureNotARobotContainer"
import { AddPhoneNumberContainer } from "./containers/AddPhoneNumberContainer"
import { AddRecoveryEmailContainer } from "./containers/AddRecoveryEmailContainer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [nextUserId, setNextUserId] = useState(1);
  const [userData, setUserData] = useState({});

// Test

useEffect(() => { 
  setUsers(prevUsers => [...prevUsers, { id: 0, email: 'tester@gmail.com', password: 'test', phoneNumber: "07720761143" }]);
}, []);

// Grab User's IP

const { userIP } = useUserIP()

// Handle Log Ins

  const handleLogin = (email, password) => {
    console.log("Attempting login with:", email, password);
    const correctLoginCredentials = users.find(
      (user) => user.email === email && user.password === password
    );

    if (correctLoginCredentials) {
      setLoggedIn(true);
      setCurrentLoggedInUser(correctLoginCredentials.email);
      console.log("Logged in as:", correctLoginCredentials.email);
    } else {
      console.log("Invalid credentials");
    }
  };

  const updateUser = (data) => {
    setUserData(prevData => ({ ...prevData, ...data }));
  };

  const addUser = () => {
    const newUser = {
      id: nextUserId,
      ...userData
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setUserData({}); // Clear temporary user data
    setNextUserId(prevId => prevId + 1); // Increment nextUserId
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <FrontPageStaticContainer>
              <SignInFrontPageContainer 
                users={users}
                handleLogin={handleLogin}
                userIP={userIP}
              />
            </FrontPageStaticContainer>
          } />
        <Route 
          path="/mockmail" 
          element={<MockMailContainer   
                    loggedIn={loggedIn}
                    currentLoggedInUser={currentLoggedInUser}
                   />} 
        />
        <Route path="/create-account" element={
            <StaticElementContainer>
              <CreateAccountContainer 
                updateUser={updateUser} 
              />
            </StaticElementContainer>
          } 
        />
        <Route path="/basic-information" element={
              <BirthdayAndGenderContainer
                updateUser={updateUser} 
              />
          } 
        />
        <Route path="/choose-your-gmail-address" element={
            <StaticElementContainer>
              <ChooseYourGmailAddressContainer
                updateUser={updateUser} 
                users={users}
              />
            </StaticElementContainer>
          } 
        />
        <Route path="/create-password" element={
            <CreatePasswordStaticElementContainer>
              <CreatePasswordContainer
                updateUser={updateUser} 
                users={users}
              />
            </CreatePasswordStaticElementContainer>
          } 
        />
        <Route path="/confirm-youre-not-a-robot" element={
            <ConfirmYoureNotARobotContainer
              updateUser={updateUser}
              userIP={userIP}
              users={users}
            />
          } 
        />
        <Route path="/add-recovery-email" element={
            <StaticElementContainer>
              <AddRecoveryEmailContainer
                updateUser={updateUser} 
              />
            </StaticElementContainer>
          } 
        />
        <Route path="/add-phone-number" element={
            <StaticElementContainer>
              <AddPhoneNumberContainer
                updateUser={updateUser} 
                users={users}
                userIP={userIP}
              />
            </StaticElementContainer>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
