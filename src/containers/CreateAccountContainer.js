import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateAccountcomponent } from "../components/CreateAccountComponent";
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';


export const CreateAccountContainer = ({ updateUser }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);

    const navigate = useNavigate();

// Pre-load Error Img

    const isImagePreloaded = useImagePreload(errorImage);

// First Name

    // Allow Only String Values to be Inputted

    const isLetters = (str) => /^[A-Za-z]*$/.test(str);

    const onFirstNameInputChange = (e,) => {
        const { value } = e.target;
        if (isLetters(value)) {
          setFirstName(value);
        }
    };

// First Name Errors

    const firstNameError = () => setErrorCondition("firstNameEmpty");

    const unsureNameIsCorrect = () => setErrorCondition("areYouSureCorrect");

// Last Name - Allow Only Letters

    const onLastNameInputChange = (e) => {
        if (isLetters(e.target.value)) {
            setLastName(e.target.value);
        }
    };

// Handle Next

    const handleNextClick = () => {
        const firstNameInput = document.getElementById('firstNameInput');

        if (firstName !== '' && firstName.length > 2) {
            setErrorCondition(null);
            updateUser({ firstName: firstName, lastName: lastName });
            navigate('/basic-information');
            console.log(firstName);
        } 

        if (firstName.length > 0 && firstName.length <= 2) {
            unsureNameIsCorrect();
            if (firstNameInput) {
                setIsFirstNameFocused(true); 
                firstNameInput.focus();
             }
        }
        if (firstName === '') {
            firstNameError();
            if (firstNameInput) {
               setIsFirstNameFocused(true); 
               firstNameInput.focus();
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
                isImagePreloaded={isImagePreloaded}
                isFirstNameFocused={isFirstNameFocused}
                setIsFirstNameFocused={setIsFirstNameFocused}
                onFirstNameInputChange={onFirstNameInputChange}
                onLastNameInputChange={onLastNameInputChange}
                errorCondition={errorCondition}
            />
        </>
    );
}