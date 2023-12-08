import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateAccountcomponent } from "../components/CreateAccountComponent";
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CreateAccountContainer = ({ updateUser }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);
    const [isFirstNameBiggerThan0, setIsFirstNameBiggerThan0] = useState(false);

    const navigate = useNavigate();

// Pre-load Error Img

    const isImagePreloaded = useImagePreload(errorImage);

// First Name

    const handleFirstNameBlur = () => {
        setIsFirstNameFocused(false); 
    }

    const toggleIsNameFocused = () => {
        setIsFirstNameFocused(true);
    }

    const firstNameError = () => setErrorCondition("firstNameEmpty");

    const unsureNameIsCorrect = () => setErrorCondition("areYouSureCorrect");

// Only Allow String Values to be Inputted

    const isLetters = (str) => /^[A-Za-z]*$/.test(str);

    const onFirstNameInputChange = (e) => {
        const { value } = e.target;
        if (isLetters(value)) {
          setFirstName(value);
        }
        if (value.length > 0) {
            setIsFirstNameBiggerThan0(true);
        }
        if (value.length === 0) {
            setIsFirstNameBiggerThan0(false);
        }
    };

    const onLastNameInputChange = (e) => {
        const { value } = e.target;
        if (isLetters(value)) {
          setLastName(value);
        }
    };

// Custom MUI Button Styles and Functions

    const CustomNextButton = styled(Button)({
        backgroundColor: 'rgb(26,115,232)',
        border: '2px solid rgb(26,115,232)',
        color: 'white',
        padding: '3px 21.59px',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: 'rgb(34 106 202)',
            boxShadow: ('0 1px 2px 0 rgba(60, 64, 67, .3)', 
                        '0 1px 3px 1px rgba(60, 64, 67, .15)'),
            border: '2px solid rgb(34 106 202)',    
            '& .MuiTouchRipple-child': {
                backgroundColor: 'rgb(33 88 161)', // Change this to your desired ripple color
              },
        },
        textTransform: 'none',
        margin: 'margin: 7px 1.5px 20px 0;'
    });

// Handle Next

    const handleNextClick = () => {
        if (firstName !== '' && firstName.length > 2) {
            setErrorCondition(null);
            updateUser({ firstName: firstName, lastName: lastName });
            navigate('/basic-information');
        } 

        const firstNameInput = document.getElementById('firstNameInput');

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
                CustomNextButton={CustomNextButton}
                onFirstNameInputChange={onFirstNameInputChange}
                onLastNameInputChange={onLastNameInputChange}
                handleFirstNameBlur={handleFirstNameBlur}
                toggleIsNameFocused={toggleIsNameFocused}
                errorCondition={errorCondition}
                isFirstNameBiggerThan0={isFirstNameBiggerThan0}
            />
        </>
    );
}