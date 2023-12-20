import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomNextButton from './CustomNextButton';

export const ChooseYourGmailAddressComponent = ({ 
    email,
    handleNextClick,
    isImagePreloaded,
    errorCondition,
    handleSelectEmail
}) => {

    return (
        <form>

            <h1 class="thin h1-space">How you'll sign in</h1>

            <h2 class='thin gap center' id='h2'>Create a Gmail addres for signing in to your Google Account</h2>

            <div class="space line-height label-input-width input-label" id='username-input-width'>
                <Box>
                    <TextField
                        fullWidth error={errorCondition}
                        id='usernameInput'
                        value={email}
                        type='text'
                        label="Username"
                        onChange={handleSelectEmail}
                        InputLabelProps={
                            errorCondition ? 
                            { 
                                sx: {
                                    color: email ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
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
                    <span class='static-position'>
                        @gmail.com
                    </span>
                </Box> 
            </div>

            {errorCondition === "isIncorrectLength" && isImagePreloaded ? (
                <div class='long-error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message-6-30">Sorry, your username must be between 6 and 30 characters long.</p>
                </div>
            ) : errorCondition === "usernameEmpty" && isImagePreloaded ? (
                <div class='error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Enter a Gmail address</p>
                </div>
            ) : errorCondition === "usesUnallowedChars" && isImagePreloaded ? (
                <div class='long-error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Sorry, only letters (a-z), numbers (0-9) and periods (.) are allowed.</p>
                </div>
            ) : errorCondition === "usernameIsAlreadyTaken" && isImagePreloaded ? (
                <div class='long-error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">That username is taken. Try another.</p>
                </div>
            ) : (
                <div class='below-input-small-grey'>
                    <p class='small-grey'>You can use letters, numbers & periods</p>
                </div>
            )}

            <div id='button-right-choose-email'>
                <CustomNextButton 
                    class="button-space blue-button"
                    variant="contained" 
                    onClick={handleNextClick}
                    sx={{
                        '&& .MuiTouchRipple-rippleVisible': {
                            animationDuration: '300ms',
                        },
                    }}
                >
                        Next
                </CustomNextButton>
            </div>

        </form>
    );
}