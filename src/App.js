import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUserIP } from './utils/userIPModule';
import axios from "axios";  
import textData from './data/textData';
import { filteredCountriesFromUtil } from './utils/countryDropDownOptions';
import { FrontPageStaticContainer } from './containers/FrontPageStaticContainer'
import { SignInFrontPageContainer } from "./containers/SignInFrontPageContainer";
import { MockMailContainer } from "./containers/MockMailContainer";
import { CreateAccountContainer } from "./containers/CreateAccountContainer";
import { BirthdayAndGenderContainer } from "./containers/BirthdayAndGenderContainer";
import { ChooseYourGmailAddressContainer } from "./containers/ChooseYourGmailAddressContainer";
import { CreatePasswordContainer } from "./containers/CreatePasswordContainer";
import { ConfirmYoureNotARobotContainer } from "./containers/ConfirmYoureNotARobotContainer"
import { EnterTheCodeContainer } from "./containers/EnterTheCodeContainer";
import { AddRecoveryEmailContainer } from "./containers/AddRecoveryEmailContainer";
import { ReviewYourAccountInfoContainer } from "./containers/ReviewYourAccountInfoContainer";
import { ChooseYourSettingsContainer } from "./containers/ChooseYourSettingsContainer";
import { ExpressChooseYourSettingsContainer } from "./containers/ExpressChooseYourSettingsContainer";
import { ConfirmYourSettingsContainer } from "./containers/ConfirmYourSettingsContainer";
import { ManualChooseYourSettingsContainer } from "./containers/ManualChooseYourSettingsContainer";
import { ManualChooseYourSettingsContainer2 } from "./containers/ManualChooseYourSettingsContainer2";
import { ManualChooseYourSettingsContainer3 } from "./containers/ManualChooseYourSettingsContainer3";
import { ManualChooseYourSettingsContainer4 } from "./containers/ManualChooseYourSettingsContainer4";
import { PrivacyAndTermsContainer } from "./containers/PrivacyAndTermsContainer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [nextUserId, setNextUserId] = useState(1);
  const [userData, setUserData] = useState({ manualSetting4: 'no privacy reminders' });
  const [hasSelectedCYNARCountry, setHasSelectedCYNARCountry] = useState(false);
  const [text, setText] = useState(textData);
  const [translatedCountries, setTranslatedCountries] = useState(filteredCountriesFromUtil);
  const [hasTranslatedCountries, setHasTranslatedCountries] = useState(false);
  const [showPrivacyRow, setShowPrivacyRow] = useState(false);
  const [translationLoading, setTranslationLoading] = useState(false);

// Translation

  const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    handleLanguageSelection();
    console.log('chosenLanguage:', userData.language)
  }, [userData.language]);

  const handleLanguageSelection = async () => {
    if (!userData.language) return;
    setTranslationLoading(true);
    const chosenLanguage = userData.language;

    try {
        // Translate text
        const translatedText = {};
        for (const topLevelKey in text) {
            const topLevelObject = text[topLevelKey];
            const translatedTopLevelObject = {};

            // Translate each key-value pair in the nested object
            for (const key in topLevelObject) {
                const translation = await changeLanguageAndTranslate(topLevelObject[key], chosenLanguage);
                translatedTopLevelObject[key] = translation;
            }

            translatedText[topLevelKey] = translatedTopLevelObject;
        }

        // Sanitize the translated text before setting it to state
        const sanitizedTranslatedText = sanitizeText(translatedText);

        // Update the 'text' state with sanitized translated text
        setText(sanitizedTranslatedText);

        // Translate country names
        const newTranslatedCountries = await Promise.all(filteredCountriesFromUtil.map(async (country) => {
            const translatedName = await changeLanguageAndTranslate(country.name, chosenLanguage);
            return { ...country, name: translatedName };
        }));

        const sanitizedTranslatedCountries = sanitizeCountryNames(newTranslatedCountries);

        const orderedSanitizedTranslatedCountries = [...sanitizedTranslatedCountries].sort((a, b) => a.name.localeCompare(b.name));

        // Update the translatedCountries state with new translated countries
        setTranslatedCountries(orderedSanitizedTranslatedCountries);
        setHasTranslatedCountries(true);

    } catch (error) {
        console.error('Error translating text:', error);
    }
    setTranslationLoading(false);
  }; 

  const changeLanguageAndTranslate = async (text, chosenLanguage) => {
      updateUser({ language: chosenLanguage })
      try {
        const res = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${googleAPIKey}`, {
          q: text,
          target: chosenLanguage,
        });
        return res.data.data.translations[0].translatedText;
      } catch (error) {
        console.error('Error translating text:', error);
        return null;
      }
  };
  
// Translation Sanitisation 

  const sanitizeText = (translatedText) => {
    const sanitizedText = {};

    for (const topLevelKey in translatedText) {
      const topLevelObject = translatedText[topLevelKey];
      const sanitizedTopLevelObject = {};

      for (const key in topLevelObject) {
        const sanitizedValue = topLevelObject[key].replace(/&#39;/g, "'").replace(/«/g,'"').replace(/»/g,'"').replace(/&quot;/g,'"');
        // Add more sanitization rules as needed

        sanitizedTopLevelObject[key] = sanitizedValue;
      }

      sanitizedText[topLevelKey] = sanitizedTopLevelObject;
    }

    return sanitizedText;
  };

  const sanitizeCountryNames = (countries) => {
    const sanitizedCountries = countries.map(country => ({
      ...country,
      name: country.name.replace(/&#39;/, "'")
    }));
  
    return sanitizedCountries;
  };

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

// Update User Data

  const updateUser = data => {
    setUserData(prevData => ({ ...prevData, ...data }));
  };

// Add User

  const addUser = () => {
    const newUser = {
      id: nextUserId,
      ...userData
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setNextUserId(prevId => prevId + 1);
    setUserData({});
  };

// Handle CYNAR Country Selection

  const handleCYNARCountrySelect = () => setHasSelectedCYNARCountry(true);

// Choose Your Settings No Privacy Row For Confirm Your Settings

  const makePrivacyRowVisible = () => setShowPrivacyRow(true);

  const hidePrivacyRow = () => setShowPrivacyRow(false);

  useEffect(() => {
    console.log('users', users);
  }, [users]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <FrontPageStaticContainer>
              <SignInFrontPageContainer 
                users={users}
                handleLogin={handleLogin}
                userIP={userIP}
                text={text}
                userData={userData}
                
              />
            </FrontPageStaticContainer>
          } />
        <Route 
          path="/mockmail" 
          element={<MockMailContainer   
                    loggedIn={loggedIn}
                    currentLoggedInUser={currentLoggedInUser}
                    text={text}
                    users={users}
                    userData={userData}
                    
                  />} 
        />
        <Route path="/create-account" element={
            <CreateAccountContainer 
              updateUser={updateUser}
              userData={userData}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/basic-information" element={
              <BirthdayAndGenderContainer
                updateUser={updateUser}
                userData={userData}
                text={text}
                translationLoading={translationLoading}
                
              />
          } 
        />
        <Route path="/choose-your-gmail-address" element={
            <ChooseYourGmailAddressContainer
              updateUser={updateUser} 
              users={users}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/create-password" element={
            <CreatePasswordContainer
              updateUser={updateUser} 
              users={users}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/confirm-youre-not-a-robot" element={
            <ConfirmYoureNotARobotContainer
              updateUser={updateUser}
              userData={userData}
              userIP={userIP}
              users={users}
              handleCYNARCountrySelect={handleCYNARCountrySelect}
              hasSelectedCYNARCountry={hasSelectedCYNARCountry}
              text={text}
              translatedCountries={translatedCountries}
              hasTranslatedCountries={hasTranslatedCountries}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/enter-the-verification-code" element={
            <EnterTheCodeContainer
              updateUser={updateUser}
              userData={userData}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/add-recovery-email" element={
            <AddRecoveryEmailContainer
              updateUser={updateUser} 
              text={text}
              translationLoading={translationLoading}
              userData={userData}
              
            />
          } 
        />
        <Route path="/review-account-info" element={
            <ReviewYourAccountInfoContainer 
              updateUser={updateUser}
              userData={userData}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />
        <Route path="/choose-your-settings" element={
            <ChooseYourSettingsContainer
              updateUser={updateUser}
              text={text}
              translationLoading={translationLoading}
              userData={userData}
              
            />
          } 
        />
        <Route path="/express-choose-your-settings" element={
            <ExpressChooseYourSettingsContainer
              updateUser={updateUser}
              text={text}
              hidePrivacyRow={hidePrivacyRow}  
              translationLoading={translationLoading}
              userData={userData}
              
            />
          } 
        />
        
        <Route path="/manual-choose-your-settings" element={
            <ManualChooseYourSettingsContainer
              userData={userData}
              updateUser={updateUser}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />

        <Route path="/manual-choose-your-settings2" element={
            <ManualChooseYourSettingsContainer2
              userData={userData}
              updateUser={updateUser}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />

        <Route path="/manual-choose-your-settings3" element={
            <ManualChooseYourSettingsContainer3
              userData={userData}
              updateUser={updateUser}
              text={text}
              translationLoading={translationLoading}
              
            />
          } 
        />

        <Route path="/manual-choose-your-settings4" element={
            <ManualChooseYourSettingsContainer4
              userData={userData}
              updateUser={updateUser}
              text={text}
              makePrivacyRowVisible={makePrivacyRowVisible}
              translationLoading={translationLoading}
              
            />
          } 
        />

        <Route path="/confirm-your-settings" element={
            <ConfirmYourSettingsContainer
              text={text}
              userData={userData}
              updateUser={updateUser}
              showPrivacyRow={showPrivacyRow}
              translationLoading={translationLoading}
              
            />
          } 
        />

        <Route path="/privacy-and-terms" element={
            <PrivacyAndTermsContainer
              text={text}
              userData={userData}
              updateUser={updateUser}
              addUser={addUser}
              handleLogin={handleLogin}
              users={users}
              loggedIn={loggedIn}
              translationLoading={translationLoading}
              
            />
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;