import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const CreateAccountcomponent = ({ 
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleNextClick,
    firstNameEmpty,
    isImagePreloaded,
    isFirstNameFocused,
    setIsFirstNameFocused

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
                {firstNameEmpty ? (<TextField 
                    error
                    id="firstNameInput" 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setIsFirstNameFocused(true)}
                    onBlur={() => setIsFirstNameFocused(false)}
                    InputLabelProps={{
                        style: {
                            color: isFirstNameFocused ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
                        },
                    }}
                />) : (<TextField 
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&:hover:not(.Mui-focused) fieldset": {
                              borderColor: "#c4c4c4"
                            }
                        }
                    }}
                    id="firstNameInput" 
                    label="First Name" 
                    variant="outlined" 
                    fullWidth
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    
                />)}
                <TextField 
                    label="Last Name (optional)"
                    className='last-name-margin-top' 
                    variant="outlined" 
                    fullWidth
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&:hover:not(.Mui-focused) fieldset": {
                              borderColor: "#c4c4c4"
                            },
                        },
                    }}
                />       
            </Box>

            {firstNameEmpty && isImagePreloaded ? (
                <div class='error-div'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Enter first name</p>
                </div>
            ) : (
                <div className='hidden-error-message-container-create-account'></div>
            )}
            
            <div class={firstNameEmpty ? 'button-right-first-name-empty' : 'button-right'}>
                <button type='button' class="button-space blue-button" onClick={handleNextClick}>
                    Next   
                </button>
            </div>

        </form>
    );
}