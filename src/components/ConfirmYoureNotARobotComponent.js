import React from 'react';
import Select from 'react-select';
import errorImage from '../images/Daco_5575399.png';
import GBSVG from '../images/flags/gb2.svg';

export const ConfirmYoureNotARobotComponent = ({ 
    phoneNumber,
    setPhoneNumber,
    handlePhoneNumberClick,
    handlePhoneNumberBlur,
    phoneNumberPlaceholder,
    handleNextClick,
    isPhoneNumberEmpty,
    isImagePreloaded,
    isIncorrectFormat,
    isAlreadyRegistered,
    customOptions,
    usersCountryFlagSVG,
    customStyles,
    CustomDropdownIndicator,
    placeholderContent,
    setSelectedOption,
    selectedOption,
    chosenCountryFlagImage,  
}) => {

    return (
        <form>

            <h1 class="thin">Confirm you're not a robot</h1>

            <h2 class='thin gap-cynar center' id='font-and-color-cynar-h2'>Get a verification code sent to your phone</h2>

            <div id='add-phone-number-dropdown-and-input'>
                    <Select
                        styles={customStyles}
                        class="flag-drop-down"
                        options={customOptions}
                        components={{ DropdownIndicator: CustomDropdownIndicator, chosenCountryFlagImage }}
                        placeholder={placeholderContent}
                        onChange={setSelectedOption}
                        value={selectedOption}
                    />

                <label class="space-phone-number-input-cynar line-height label-input-width input-label" id='phoneNumber-input-width'>
                    <div class='placeholder-satic-cohersion-phone-number'>
                        <input 
                            id='phoneNumberInput'
                            class={isPhoneNumberEmpty ? 'error' : 'input'}
                            type='text' 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder={phoneNumberPlaceholder}
                            onFocus={handlePhoneNumberClick}
                            onBlur={handlePhoneNumberBlur}
                        />
                    </div>
                </label>
            </div>

            {isPhoneNumberEmpty && isImagePreloaded ? (
                <div class='long-error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">Please enter a phone number</p>
                </div>
            ) : isIncorrectFormat && isImagePreloaded ? (
                <div class='error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">This phone number format is not recognized. Please check the country and number.</p>
                </div>
            ) : isAlreadyRegistered && isImagePreloaded (
                <div class='error-div' id='error-div-space'>
                    <img className='error-image' src={errorImage} alt='Error Image' />
                    <p class="input-error-message">This phone number has been used too many times</p>
                </div>
            )}

            <div class='below-input-small-grey-cynar'>
                <p class='small-grey-cynar'>Google will verify this number via SMS (charges may apply).</p>
            </div>

            <div id='button-right-choose-email'>
                <button type='button' class="button-space-confirm-youre-not-a-robot blue-button" onClick={handleNextClick}>
                    Next   
                </button>
            </div>

        </form>
    );
}