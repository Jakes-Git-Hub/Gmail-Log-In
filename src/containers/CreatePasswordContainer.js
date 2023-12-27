import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreatePasswordComponent } from "../components/CreatePasswordComponent";
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';

export const CreatePasswordContainer = ({ updateUser }) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);

    const navigate = useNavigate();

    const isImagePreloaded = useImagePreload(errorImage);
    
// Password

    const handleSelectPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

// Confirm

    const handleSelectConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);     
    };

// Error messages

    const confirmYourPassword = () => {
        if (password !== '' && confirmPassword === "") {
        setErrorCondition("confirmPasswordEmpty");
        } else {
        setErrorCondition(null);
        }
    };
    
    const passwordMismatch = () => {
        if (password !== confirmPassword && confirmPassword !== '') {
        setErrorCondition("passwordMismatch");
        } else {
        setErrorCondition(null);
        }
    };
    
    const passwordEmpty = () => setErrorCondition("passwordEmpty");


    const needs8CharsOrMore = () => setErrorCondition("needs8CharsOrMore");

    
    const passwordIsntStrongEnough = () => setErrorCondition("pleaseChooseAStrongerPassword");


// Handle Next

    const handleNextClick = () => {
        const passwordInput = document.getElementById('passwordInput');
        const sufficientPasswordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const checkIfPasswordIsStrongEnough = () => {
            const passwordTest = sufficientPasswordStrength.test(password);
            const confirmPasswordTest = sufficientPasswordStrength.test(confirmPassword);
            if (!passwordTest && !confirmPasswordTest) {
                passwordIsntStrongEnough();
                console.log("not fine");
                return false;
            } else {
                console.log("fine");
                return true;
            }
        }
        checkIfPasswordIsStrongEnough();
        if (password === confirmPassword && password !== '' && confirmPassword !== '' && checkIfPasswordIsStrongEnough()) {
        updateUser({ password: password });
        setPassword('');
        setConfirmPassword('');
        setErrorCondition(null);
        navigate('/confirm-youre-not-a-robot');
        } if (password.length >= 8) {
            if (errorCondition === "passwordEmpty" || errorCondition === "needs8CharsOrMore") {
                setErrorCondition(null);
            }
        } if (password === '') {
            passwordEmpty();
            passwordInput.focus();
        } if (password.length < 8 && password !== '') {
            needs8CharsOrMore();
            passwordInput.focus();
        } if (password !== '' && password.length >= 8 && confirmPassword === "") {
            confirmYourPassword();
            const confirmPasswordInput = document.getElementById('confirmPasswordInput');
            confirmPasswordInput.focus();
        } if (password !== confirmPassword && password !== "" && confirmPassword !== '') {
            passwordMismatch();
        } 
    }

 return(
    <>
        <CreatePasswordComponent
            password={password}
            setPassword={setPassword}
            handleSelectPassword={handleSelectPassword}
            confirmPassword={confirmPassword}
            handleSelectConfirmPassword={handleSelectConfirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleNextClick={handleNextClick}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleTogglePassword={handleTogglePassword}
            confirmYourPassword={confirmYourPassword}
            passwordMismatch={passwordMismatch}
            isImagePreloaded={isImagePreloaded}
            errorCondition={errorCondition}
        />
    </>
 );
};
