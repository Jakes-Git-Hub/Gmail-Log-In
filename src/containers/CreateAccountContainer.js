import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateAccountcomponent } from "../components/CreateAccountComponent";
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';

export const CreateAccountContainer = ({ updateUser }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [firstNameEmpty, setFirstNameEmpty] = useState(false);

    const navigate = useNavigate();

// Pre-load Error Img

const isImagePreloaded = useImagePreload(errorImage);

// First Name Error Message

    const firstNameError = () => setFirstNameEmpty(true);

// Custom MUI Styles

// Handle Next

    const handleNextClick = () => {
        if (firstName !== '') {
            updateUser({ firstName: firstName, lastName: lastName });
            setFirstName('');
            setLastName('');
            setFirstNameEmpty(false);
            navigate('/basic-information');
        } else if (firstName === '') {
            firstNameError();
            const firstNameInput = document.getElementById('firstNameInput');
            if (firstNameInput) {
               firstNameInput.focus();
               setIsFirstNameFocused(true); 
            }
        }
    };
 return(
    <>
        <CreateAccountcomponent
            firstName={firstName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            lastName={lastName}
            handleNextClick={handleNextClick}
            firstNameEmpty={firstNameEmpty}
            isImagePreloaded={isImagePreloaded}
            isFirstNameFocused={isFirstNameFocused}
            setIsFirstNameFocused={setIsFirstNameFocused}
        />
    </>
 );
}