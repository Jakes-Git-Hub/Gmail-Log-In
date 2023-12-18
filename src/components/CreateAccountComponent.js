import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomNextButton from './CustomNextButton';

export const CreateAccountcomponent = ({ 
    firstName,
    lastName,
    handleNextClick,
    isImagePreloaded,
    onFirstNameInputChange,
    onLastNameInputChange,
    errorCondition,
}) => {

    return (
        <form>

            <h1 class="thin h1-space">Create a Google Account</h1>
            <h2 class='thin gap'>Enter your name</h2>

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
                    label="First Name" 
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
                    label="Last Name (optional)"
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
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Enter first name</p>
                </div>
            ) : errorCondition === "areYouSureCorrect" && isImagePreloaded ? (
                <div class='error-div'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Are you sure you entered your name correctly?</p>
                </div>
            ) : (
                <div className='hidden-error-message-container-create-account'></div>
            )} 

            <div class={errorCondition === "firstNameEmpty" || errorCondition === "areYouSureCorrect" ? 'button-right-first-name-empty' : 'button-right'}>
                <CustomNextButton 
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