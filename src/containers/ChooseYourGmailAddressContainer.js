import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChooseYourGmailAddressComponent } from '../components/ChooseYourGmailAddressComponent';
import errorImage from '../images/Daco_5575399.png';
import useImagePreload from "../hooks/useImagePreload";

export const ChooseYourGmailAddressContainer = ({ updateUser, users }) => {

    const [email, setEmail] = useState('');
    const [errorCondition, setErrorCondition] = useState(null);
    const navigate = useNavigate();

    const isImagePreloaded = useImagePreload(errorImage);

// Email

    const handleSelectEmail = (e) => {
        setEmail(e.target.value);
    };

// Errors

    const usernameEmpty = () => setErrorCondition("usernameEmpty");

    const incorrectLength = () => setErrorCondition("isIncorrectLength");

    const unallowedChars = () => setErrorCondition("usesUnallowedChars");

    const usernameIsAlreadyTaken = () => setErrorCondition("usernameIsAlreadyTaken");

// Handle Next Click

  const handleNextClick = () => {
      setEmail(email)
      if (email === '') {
        const usernameInput = document.getElementById('usernameInput');
        usernameEmpty();
        usernameInput.focus();
      } else if (!/^[a-zA-Z0-9.]+$/.test(email)) {
        // Check if the email contains unallowed characters
        unallowedChars();
      } else if (email.length < 6 || email.length > 30) {
        incorrectLength();
      } else if (users.find(user => user.email === email + '@gmail.com')) {
        usernameIsAlreadyTaken();
      } else {
        updateUser({ email: email })
        navigate('/create-password')
      }
  };

    return (
        <>
            <ChooseYourGmailAddressComponent
                email={email}
                setEmail={setEmail}
                handleNextClick={handleNextClick}
                isImagePreloaded={isImagePreloaded}
                errorCondition={errorCondition}
                handleSelectEmail={handleSelectEmail}
            />
        </>
    )
    
}