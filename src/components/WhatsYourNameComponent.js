import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomNextButton from './buttons/CustomNextButtonComponent';
import googleWritingSvg from "../images/google-writing-svg.svg";
import LanguageChanger from './LanguageChanger/LanguageChangerComponent';


export const WhatsYourNameComponent = ({ 
    firstName,
    lastName,
    handleNextClick,
    isImagePreloaded,
    onFirstNameInputChange,
    onLastNameInputChange,
    errorCondition,
    handleLanguageSelection,
    text,
    isImageLoaded,
    userData,
    
}) => {

    return (

        <>

            <div id='google-container-BG'>

                <div className={isImageLoaded ? 'empty-blue-snake-loader-placeholder' : 'empty-blue-snake-loader'}>
                <div className="blue-snake-loader"></div>
                </div>
                <img src={googleWritingSvg} alt="Google Writing" id="google-writing-BG"/>

                <form>

                    <h1 class="thin h1-space">{text.WhatsYourName.h1[userData.language]}</h1>
                    <h2 class='thin gap'>Enter the name on your Google Account</h2>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1.25},
                            width: 363,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField 
                            error={errorCondition}
                            id="firstNameInput" 
                            label={text.CreateAccount.firstName[userData.language]}
                            variant="outlined" 
                            fullWidth
                            value={firstName}
                            onChange={onFirstNameInputChange}
                            InputLabelProps={
                                errorCondition ? 
                                { 
                                    sx: {
                                        color: firstName ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
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
                        <TextField 
                            label={text.WhatsYourName.lastName[userData.language]}
                            className='last-name-margin-top' 
                            variant="outlined" 
                            fullWidth
                            value={lastName}
                            onChange={onLastNameInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover:not(.Mui-focused) fieldset": {
                                    borderColor: "#dadce0"
                                    },
                                    "& fieldset": {
                                        borderColor: "#dadce0"
                                    },
                                },
                            }}
                        />       
                    </Box>

                    {errorCondition === "firstNameEmpty" && isImagePreloaded ? (
                        <div class='error-div'>
                            <svg aria-hidden="true" class="error-image" fill="rgb(217, 48, 37)" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                            </svg>
                            <p class="input-error-message">{text.CreateAccount.error1[userData.language]}</p>
                        </div>
                    ) : (
                        <div className='hidden-error-message-container-create-account'></div>
                    )} 

                    <div class={errorCondition === "firstNameEmpty" ? 'button-right-first-name-empty' : 'button-right-ca'}>
                        <CustomNextButton 
                            variant="contained" 
                            onClick={handleNextClick}
                            sx={{
                                '&& .MuiTouchRipple-rippleVisible': {
                                    animationDuration: '300ms',
                                },
                            }}
                        >
                            <div class='next'>
                                Next
                            </div>
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
};