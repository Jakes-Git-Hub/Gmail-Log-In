import React from 'react';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export const BirthdayAndGenderComponent = ({
    month, 
    handleMonthBlur,
    handleSelectMonth,
    day,
    handleDayBlur,
    handleSelectDay,
    year,
    handleYearBlur,
    handleSelectYear,
    gender,
    handleGenderBlur,
    handleSelectGender,
    handleNextClick,
    isImagePreloaded,
    genderEmpty,
    errorCondition,
    toggleIsMonthFocused,
    isMonthFocused,
    toggleIsDayFocused,
    isDayFocused,
    toggleIsYearFocused,
    isYearFocused,
    toggleIsGenderFocused,
    isGenderFocused,
    CustomNextButton,
    stateOfMonth,
    stateOfDay,
    stateOfYear

}) => {
    
    return (
        <form>

            <h1 class="thin h1-space">Basic Information</h1>

            <h2 class='thin gap'>Enter your birthday and gender</h2>

            <div class='third-container-basic-information'>

                <Box sx={{ width: 'calc(32.5% - 2px)' }}>
                    <FormControl fullWidth error={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? true : false}>
                        <InputLabel className={(errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat') && isMonthFocused ? "label-input-error" : (errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat') && stateOfMonth === 'selectedMonth' ? "label-input-error" : !errorCondition ? '' : 'label'}>Month</InputLabel>
                        <Select
                            value={month}
                            label="Month"
                            onChange={(e) => handleSelectMonth(e, year, day)}
                            onFocus={toggleIsMonthFocused}
                            onBlur={handleMonthBlur}
                            native="true"
                            sx={{
                                "&:hover:not(.Mui-focused)": {
                                    "&& fieldset": {
                                        borderColor: errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? "" : "#dadce0",
                                    },
                                },
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#dadce0',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "#9e9e9e",
                                },
                                [`& .MuiFormLabel-root-MuiInputLabel-root`]: {
                                    color: 'blue',
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
                        fullWidth error={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? true : false}
                        value={day}
                        label="Day"
                        onChange={(e) => handleSelectDay(e, year, month)}
                        onFocus={toggleIsDayFocused}
                        onBlur={handleDayBlur}
                        maxLength="2"
                        InputLabelProps={{
                            style: {
                                color: isDayFocused && errorCondition ? '#d32f2f' : errorCondition && stateOfDay === 'notEmpty' ? '#d32f2f' : isDayFocused && !errorCondition ? '' : 'rgba(0, 0, 0, 0.6)',
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover:not(.Mui-focused) fieldset": {
                                    borderColor: errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? "" : "#dadce0",
                                },
                            },
                            "& fieldset": {
                                borderColor: "#dadce0"
                            },
                        }}
                    />
                </Box>

                <Box sx={{ width: 'calc(32.5% - 10px)' }}>
                <TextField
                        fullWidth error={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? true : false}
                        value={year}
                        label="Year"
                        onChange={(e) => handleSelectYear(e, day, month)}
                        onFocus={toggleIsYearFocused}
                        onBlur={handleYearBlur}
                        maxLength="4"
                        InputLabelProps={{
                            style: {
                                color: isYearFocused && errorCondition ? '#d32f2f' : errorCondition && stateOfYear === 'notEmpty' ? '#d32f2f' : isYearFocused && !errorCondition ? '' : 'rgba(0, 0, 0, 0.6)',
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover:not(.Mui-focused) fieldset": {
                                    borderColor: errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? "" : "#dadce0",
                                },
                            },
                            "& fieldset": {
                                borderColor: "#dadce0"
                            },
                        }}
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
                    <FormControl fullWidth error={genderEmpty ? true : false}>
                        <InputLabel className={genderEmpty && isGenderFocused ? "label-input-error" : !genderEmpty ? '' : 'label'}>Gender</InputLabel>
                        <Select
                            value={gender}
                            label="Gender"
                            onChange={handleSelectGender}
                            onFocus={toggleIsGenderFocused}
                            onBlur={handleGenderBlur}
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
                                [`& .MuiFormLabel-root-MuiInputLabel-root`]: {
                                    color: 'blue',
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

            <section class={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' || genderEmpty ? 'button-right-error-BI' : 'button-right-BI'}>
                <CustomNextButton variant="contained" onClick={handleNextClick}>
                        Next
                </CustomNextButton>
            </section>

        </form>
    )
}