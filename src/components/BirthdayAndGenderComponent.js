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
    CustomNextButton

}) => {
    
    return (
        <form>

            <h1 class="thin h1-space">Basic Information</h1>

            <h2 class='thin gap'>Enter your birthday and gender</h2>

            <div class='third-container-basic-information'>

                <Box sx={{ width: 'calc(32.5% - 10px)' }}>
                    <FormControl fullWidth error={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? true : false}>
                        <InputLabel className={(errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat') && isMonthFocused ? "label-input-error" : 'label'}>Month</InputLabel>
                        <Select
                            value={month}
                            label="Month"
                            onChange={handleSelectMonth}
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
                            <option className="select-dropdown-MenuItems" value="" hidden></option>
                            <option className="select-dropdown-MenuItems" value="January">January</option>
                            <option className="select-dropdown-MenuItems" value="February">February</option>
                            <option className="select-dropdown-MenuItems" value="March">March</option>
                            <option className="select-dropdown-MenuItems" value="April">April</option>
                            <option className="select-dropdown-MenuItems" value="May">May</option>
                            <option className="select-dropdown-MenuItems" value="June">June</option>
                            <option className="select-dropdown-MenuItems" value="July">July</option>
                            <option className="select-dropdown-MenuItems" value="August">August</option>
                            <option className="select-dropdown-MenuItems" value="September">September</option>
                            <option className="select-dropdown-MenuItems" value="October">October</option>
                            <option className="select-dropdown-MenuItems" value="Novemeber">Novemeber</option>
                            <option className="select-dropdown-MenuItems" value="December">December</option>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ width: 'calc(32.5% - 10px)' }}>
                    <TextField
                        fullWidth error={errorCondition === 'incompleteBirthday' || errorCondition === 'isWrongFormat' ? true : false}
                        value={day}
                        label="Day"
                        onChange={handleSelectDay}
                        onFocus={toggleIsDayFocused}
                        onBlur={handleDayBlur}
                        maxLength="2"
                        InputLabelProps={{
                            style: {
                                color: isDayFocused ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
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
                        onChange={handleSelectYear}
                        onFocus={toggleIsYearFocused}
                        onBlur={handleYearBlur}
                        maxLength="4"
                        InputLabelProps={{
                            style: {
                                color: isYearFocused ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
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
            ) : (
                <div className='hidden-error-message-container-create-account'></div>
            )}            

            {errorCondition === 'isWrongFormat' && isImagePreloaded && (
                <div class='error-div' id='error-div-space-basic-info'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Please enter a valid date</p>
                </div>
            )}

            <div class='line-height gender-input-width' id='gender-space'>
                <Box>
                    <FormControl fullWidth error={genderEmpty ? true : false}>
                        <InputLabel className={genderEmpty && isGenderFocused ? "label-input-error" : 'label'}>Gender</InputLabel>
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
                            <option className="select-dropdown-MenuItems" value="" hidden></option>
                            <option className="select-dropdown-options" value="Female">Female</option>
                            <option className="select-dropdown-options" value="Male">Male</option>
                            <option className="select-dropdown-options" value="Rather ">Rather not say</option>
                            <option className="select-dropdown-options" value="Custom">Custom</option>
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