import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import googleWritingSvg from "../images/google-writing-svg.svg";

export const BirthdayAndGenderComponent = ({
    month, 
    handleSelectMonth,
    day,
    handleSelectDay,
    year,
    handleSelectYear,
    gender,
    handleSelectGender,
    handleNextClick,
    isImagePreloaded,
    genderEmpty,
    errorCondition,
    CustomNextButton,
    isImageLoaded,
    customGender,
    isWhatsYourCustomGenderInputEmpty,
    handleSelectCustomGender

}) => {
    
    return (
        <div id='google-container-BG'>
            <div className={isImageLoaded ? 'empty-blue-snake-loader-placeholder' : "empty-blue-snake-loader"}>
            <div className="blue-snake-loader"></div>
            </div>
            <img src={googleWritingSvg} alt="Google Writing" id="google-writing-BG"/>

        
            <form>

                <h1 class="thin h1-space">Basic Information</h1>

                <h2 class='thin gap'>Enter your birthday and gender</h2>

                <div class='third-container-basic-information'>

                    <Box sx={{ width: 'calc(32.5% - 2px)' }}>
                        <FormControl fullWidth error={errorCondition}>
                            <InputLabel 
                                sx={errorCondition ? 
                                    {
                                        color: month ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
                                        '&.Mui-focused': {
                                            color: '#d32f2f !important',
                                        },
                                    } : {}
                                } 
                            >
                                Month
                            </InputLabel>
                            <Select
                                value={month}
                                label="Month"
                                onChange={(e) => handleSelectMonth(e, year, day)}
                                native="true"
                                sx={{
                                    "&:hover:not(.Mui-focused)": {
                                        "&& fieldset": {
                                            borderColor: errorCondition ? "" : "#dadce0",
                                        },
                                    },
                                    ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: '#dadce0',
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "#9e9e9e",
                                    },
                                }}
                            >
                                <option value="" hidden></option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: 'calc(32.5% - 10px)' }}>
                        <TextField
                            fullWidth error={errorCondition}
                            value={day}
                            label="Day"
                            onChange={(e) => handleSelectDay(e, year, month)}
                            maxLength="2"
                            InputLabelProps={
                                errorCondition ? 
                                { 
                                    sx: {
                                        color: day ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
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
                    </Box>

                    <Box sx={{ width: 'calc(32.5% - 10px)' }}>
                        <TextField
                            fullWidth error={errorCondition}
                            value={year}
                            label="Year"
                            onChange={(e) => handleSelectYear(e, day, month)}
                            maxLength="4"
                            InputLabelProps={
                                errorCondition ? 
                                { 
                                    sx: {
                                        color: year ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
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
                    </Box>

                </div>

                {errorCondition === 'incompleteBirthday' && isImagePreloaded ? (
                    <div class='error-div' id='error-div-space-basic-info'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">Please fill in a complete birthday</p>
                    </div>
                ) : errorCondition === 'isWrongFormat' && isImagePreloaded ? (
                    <div class='error-div' id='error-div-space-basic-info'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">Please enter a valid date</p>
                    </div>
                ) : (
                    <div className='hidden-error-message-container-create-account'></div>
                )}            

                <div class='line-height gender-input-width' id='gender-space'>
                    <Box>
                        <FormControl fullWidth error={genderEmpty}>
                            <InputLabel 
                            sx={genderEmpty ? 
                                {
                                    color: gender ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
                                    '&.Mui-focused': {
                                        color: '#d32f2f !important',
                                    },
                                } : {}
                            } 
                            >  
                                Gender
                            </InputLabel>
                            <Select
                                value={gender}
                                label="Gender"
                                onChange={handleSelectGender}
                                native="true"
                                sx={{
                                    "&:hover:not(.Mui-focused)": {
                                        "&& fieldset": {
                                            borderColor: genderEmpty ? "" : "#dadce0",
                                        },
                                    },
                                    ".MuiOutlinedInput-notchedOutline": {
                                        borderColor: '#dadce0',
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "#9e9e9e",
                                    },
                                }}
                            >
                                <option value="" hidden></option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Rather ">Rather not say</option>
                                <option value="Custom">Custom</option>
                            </Select>
                        </FormControl>
                    </Box>
                </div>  

                {genderEmpty && isImagePreloaded ? (
                    <div class='error-div' id='error-div-space-basic-info'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">Please select your gender</p>
                    </div>
                ) : (
                    <div className='hidden-error-message-container-BI'></div>
                )} 

                <div class='line-height gender-input-width' id='gender-space'>
                    <Box>
                            <TextField
                                fullWidth error={isWhatsYourCustomGenderInputEmpty}
                                value={customGender}
                                label="What's your gender?"
                                onChange={handleSelectCustomGender}
                                InputLabelProps={
                                    errorCondition ? 
                                    { 
                                        sx: {
                                            color: customGender ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
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
                    </Box>  
                </div>

                <section class={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' || genderEmpty ? 'button-right-error-BI' : 'button-right-BI'}>
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
                </section>

            </form>
        </div>
    )
}