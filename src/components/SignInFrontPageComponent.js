import React from "react";
import LanguageChanger from "./LanguageChanger/LanguageChangerComponent";
import googleWritingSvg from "../images/google-writing-svg.svg";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TransparentSmallButtonSignInPage from "./buttons/TransparentSmallButtonSignInPageComponent";
import CustomNextButton from "./buttons/CustomNextButtonComponent";
import SecondaryGreyButton from "./buttons/SecondaryGreyButtonComponent";

export const SignInFrontPageComponent = ({ 
    isImageLoaded,
    handleLanguageSelection,
    handleCreateAccountClick,
    isImagePreloaded,
    userData,
    errorCondition,
    emailOrPhone,
    onEmailOrPhoneChange,
    handleForgotEmailButtonClick,
    handleGuestModeInfoButtonClick,
    handleNextClick,
    text,
    
}) => {

    return (

        <>

            <div id='google-container-BG'>

                <div className={isImageLoaded ? 'empty-blue-snake-loader-placeholder' : 'empty-blue-snake-loader'}>
                <div className="blue-snake-loader"></div>
                </div>
                <img src={googleWritingSvg} alt="Google Writing" id="google-writing-BG"/>

                <form>

                    <h1 class="thin h1-space">{text.SignIn.h1[userData.language]}</h1>

                    <h2 class='thin gap'>Use your Google Account</h2>


                    <TextField 
                        className="standard-text-field"
                        error={errorCondition}
                        id="emailOrPhoneInput" 
                        label={'Email or phone'}
                        variant="outlined" 
                        fullWidth
                        value={emailOrPhone}
                        onChange={onEmailOrPhoneChange}
                        InputLabelProps={
                            errorCondition ? 
                            { 
                                sx: {
                                    color: emailOrPhone ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
                                    '&.Mui-focused': {
                                        color: '#d32f2f !important',
                                    },
                                },
                            } : {}
                        }
                        sx={
                            errorCondition ? 
                            {} : 
                            {
                                "& .MuiOutlinedInput-root": {
                                    "&:hover:not(.Mui-focused) fieldset": {
                                        borderColor: "#dadce0"
                                    },
                                    "& fieldset": {
                                        borderColor: "#dadce0"
                                    },
                                }
                            }
                        }
                    />     

                    {errorCondition === 'emailOrPhoneEmpty' && isImagePreloaded && (
                        <div class='error-div'>
                            <svg aria-hidden="true" class="error-image" fill="rgb(217, 48, 37)" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                            </svg>
                            <p class="input-error-message">Enter an email or phone number</p>
                        </div>
                    )}

                    {errorCondition === 'couldntFindYourAccount' && isImagePreloaded && (
                        <div class='error-div'>
                            <svg aria-hidden="true" class="error-image" fill="rgb(217, 48, 37)" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                            </svg>
                            <p class="input-error-message">Couldn't find your Google Account</p>
                        </div>
                    )}    
                      
                    <div id='forgot-email-container'>
                        <TransparentSmallButtonSignInPage onClick={handleForgotEmailButtonClick}>
                            Forgot email?
                        </TransparentSmallButtonSignInPage>
                    </div>

                    <div id='sign-in-guest-mode-container'>
                        <p class='p-sign-in'>Not your computer? Use Guest mode to sign in privately.</p>
                        <TransparentSmallButtonSignInPage onClick={handleGuestModeInfoButtonClick}>
                            Learn more about using Guest mode
                        </TransparentSmallButtonSignInPage>
                    </div>  

                    <div id='create-account-and-next-button-div-sign-in-page'>
                        <SecondaryGreyButton  onClick={handleCreateAccountClick} id='create-account-button-adjust-left'>
                            Create account
                        </SecondaryGreyButton>

                        <CustomNextButton onClick={handleNextClick}>
                            Next  
                        </CustomNextButton>
                        
                    </div>

                </form>

            </div>

            <LanguageChanger 
                className='language-changer-div'
                onChange={handleLanguageSelection}
                initialLanguage={userData.language}
            />

        </>
  );
}


