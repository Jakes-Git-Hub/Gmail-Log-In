import React from 'react';
import Select from 'react-select';
import errorImage from '../images/Daco_5575399.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import googleWritingSvg from "../images/google-writing-svg.svg";
import InputAdornment from "@mui/material/InputAdornment";
import CodeInput from 'react-code-input';
import CustomNextButton from './CustomNextButton';



export const ConfirmYoureNotARobotComponent = ({ 
    phoneNumber,
    handleSelectPhoneNumber,
    handleNextClick,
    isImagePreloaded,
    customOptions,
    customStyles,
    customDropdownIndicator,
    placeholderContent,
    selectedOption,
    chosenCountryFlagImage, 
    isImageLoaded,
    handleCountrySelect,
    errorCondition,
    actualSelectedOption,
    handleUserVerificationCodeInput,
    userInputtedVerificationCode,
    showVerificationCodeInput,
    formattedPhoneNumber,
}) => {

    return (

        <div id='google-container-BG'>
            <div className={isImageLoaded ? 'empty-blue-snake-loader-placeholder' : "empty-blue-snake-loader"}>
            <div className="blue-snake-loader"></div>
            </div>
            <img src={googleWritingSvg} alt="Google Writing" id="google-writing-BG"/>

            <form>

                <h1 class="thin">Confirm you're not a robot</h1>

                <h2 class='thin gap-cynar' id='font-and-color-cynar-h2'>Get a verification code sent to your phone</h2>

                <div id='add-phone-number-dropdown-and-input'>
                    <Select
                        styles={customStyles}
                        class="flag-drop-down"
                        options={customOptions}
                        components={{ 
                            DropdownIndicator: customDropdownIndicator, 
                            SingleValue: chosenCountryFlagImage, 
                        }}
                        placeholder={placeholderContent}
                        onChange={handleCountrySelect}
                        value={selectedOption}
                        onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              return '';
                            }
                            return inputValue;
                        }}
                    />

                    <div class='line-height gender-input-width' id='phoneNumber-input-width'>
                        <Box>
                                <TextField
                                    autoFocus
                                    fullWidth error={errorCondition}
                                    id='phoneNumberInput'
                                    value={phoneNumber}
                                    label="Phone Number"
                                    type="number text"
                                    onChange={handleSelectPhoneNumber}
                                    InputLabelProps={
                                        errorCondition ? 
                                        { 
                                            sx: {
                                                color: phoneNumber || actualSelectedOption ? '#d32f2f' : 'rgba(0, 0, 0, 0.6) !important',
                                                '&.Mui-focused': {
                                                    color: '#d32f2f !important',
                                                },
                                            },
                                        } : {}
                                    }
                                    InputProps={{
                                        startAdornment: actualSelectedOption ? (
                                          <InputAdornment position="start">{selectedOption.value.dialingCode}</InputAdornment>
                                        ) : null,
                                      }}
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
                                            },
                                        }
                                    }
                                />
                        </Box>  
                    </div>
                </div>

                {errorCondition === "phoneNumberEmpty" && isImagePreloaded ? (
                    <div class='long-error-div' id='error-div-space-cynar'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">Please enter a phone number</p>
                    </div>
                ) : errorCondition === "incorrectFormat" && isImagePreloaded ? (
                    <div class='error-div' id='error-div-space-cynar'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">This phone number format is not recognized. Please check the country and number.</p>
                    </div>
                ) : errorCondition === "alreadyRegistered" && isImagePreloaded ? (
                    <div class='error-div' id='error-div-space-cynar'>
                        <img className='error-image' src={errorImage} alt='Error Image' />
                        <p class="input-error-message">This phone number has been used too many times</p>
                    </div>
                ) : null}

                <div class='below-input-small-grey-cynar'>
                    <p class='small-grey-cynar'>Google will verify this number via SMS (charges may apply).</p>
                </div>

                <div style={{ display: showVerificationCodeInput ? "block" : "none" }} id="verification-code-cynar">
                    <CodeInput
                        className="code-input"
                        type= "number"
                        fields={6}
                        value={userInputtedVerificationCode}
                        onChange={handleUserVerificationCodeInput}
                        inputStyle={{
                            "MozAppearance": "textfield",
                            "borderRadius": "4px",
                            "border": "1px solid #dadce0",
                            "margin": "4px 8px 4px 8px",
                            "paddingLeft": "10.6px",
                            "width": "36px",
                            "height": "42px",
                            "fontSize": "1.25rem",
                            "boxSizing": "border-box",
                            "color": "rgb(32,33,36)",
                            "backgroundColor": "white",
                        }}
                    />
                </div>
                
                <div id={formattedPhoneNumber ? 'button-right-robot-confirm' : "button-right-robot"}>
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

        </div>               

    );
}