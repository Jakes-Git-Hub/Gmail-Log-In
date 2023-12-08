import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const CreateAccountcomponent = ({ 
    firstName,
    lastName,
    handleNextClick,
    isImagePreloaded,
    isFirstNameFocused,
    CustomNextButton,
    onFirstNameInputChange,
    onLastNameInputChange,
    handleFirstNameBlur,
    toggleIsNameFocused,
    errorCondition,
    isFirstNameBiggerThan0
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
                {errorCondition === "firstNameEmpty" || errorCondition === "areYouSureCorrect" ? (
                    <TextField 
                        error
                        id="firstNameInput" 
                        label="First Name" 
                        variant="outlined" 
                        fullWidth
                        value={firstName}
                        onChange={onFirstNameInputChange}
                        InputLabelProps={{
                            style: {
                                color: isFirstNameBiggerThan0 ? '#d32f2f' : (isFirstNameFocused ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)'),
                            },
                        }}
                        onBlur={handleFirstNameBlur}
                        onFocus={toggleIsNameFocused}
                    />
                ) : (
                    <TextField 
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover:not(.Mui-focused) fieldset": {
                                borderColor: "#dadce0"
                                },
                                "& fieldset": {
                                    borderColor: "#dadce0"
                                },
                            }
                        }}
                        id="firstNameInput" 
                        label="First Name" 
                        variant="outlined" 
                        fullWidth
                        value={firstName}
                        onChange={onFirstNameInputChange}
                        
                    />
                )}
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
                <CustomNextButton variant="contained" onClick={handleNextClick}>
                    Next
                </CustomNextButton>
            </div>

        </form>
    );
}