import React, { useState, useEffect } from 'react';
import { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ConfirmYoureNotARobotComponent } from '../components/ConfirmYoureNotARobotComponent';
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { countries } from '../utils/countryDropDownOptions';
import axios from 'axios';
import dropDownImageSVG from '../images/gmail-drop-down-svg.svg';
import GBSVG from '../images/flags/gb2.svg';
import googleWritingSvg from "../images/google-writing-svg.svg";

export const ConfirmYoureNotARobotContainer = ({ updateUser, users, userIP }) => {

    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorCondition, setErrorCondition] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);  
    const [usersCountryFlagSVG, setUsersCountryFlagSVG] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [actualSelectedOption, setActualSelectedOption] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [topOption, setTopOption] = useState(null);
    const [countryFromAPI, setCountryFromAPI] = useState({});
    const [userInputtedVerificationCode, setUserInputtedVerificationCode] = useState('');
    const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
    const [twilioVerificationCode, setTwilioVerificationCode] = useState('');

    const navigate = useNavigate();

// Loads Error Image

    const isImagePreloaded = useImagePreload(errorImage);

    useEffect(() => {
        const image = new Image();
        image.src = googleWritingSvg;
        image.onload = () => {
          setIsImageLoaded(true);
        };
    }, []);

// Get User's Country from IP and Set Placeholder SVG Based on it

    useEffect(() => { 
        if (userIP) {
            const apiKey = 'b2ef0251b1264f88ae869467dfe144d8';

            axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=102.217.238.0`)
            .then((response) => {
                const countryFromIP = response.data.country_name;
                const matchingCountry = countries.find(country => country.name === countryFromIP);
                if (matchingCountry) {
                    setUsersCountryFlagSVG(matchingCountry.svg);
                    setCountryFromAPI({name: matchingCountry.name, svg:matchingCountry.svg});
                    console.log("usersCountryFlagSVG:", usersCountryFlagSVG);
                    console.log("countryFromAPI:", countryFromAPI);
                }
                console.log(`User's country: ${countryFromIP}`);
            })
            .catch((error) => {
                console.error('Error fetching geolocation data:', error);
            });
        } else {
            console.log("didn't work, or still waiting for IP API request");
        }
    }, [userIP, usersCountryFlagSVG]);

// phoneNumber

    const handleCountrySelect = (selectedOption) => {
        setSelectedOption(selectedOption);
        setActualSelectedOption(true);
        setPhoneNumber("");
    }

    const handleSelectPhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

// Error Messages

    const setError = errorType => setErrorCondition(errorType);

// Custom React Select Components

    const customDropdownIndicator = ({ menuIsOpen, innerProps, ...rest }) => {
    
        return (
        <components.DropdownIndicator {...innerProps} { ...rest }>
            <img
                src={dropDownImageSVG}
            />
        </components.DropdownIndicator>
        );
    };

    const chosenCountryFlagImage = ({ children, ...props }) => {
        return (
        <components.SingleValue {...props}>
            {props.data && props.data.value ? (
                <img
                    src={require(`../images/flags/${props.data.value.svg}`)}
                    className="flag-image"
                    alt={`${props.data.value.name} flag`}
                    style={{ 
                        marginLeft: '14px',
                        marginBottom: '2px',
                    }}
                />
            ) : null}
        </components.SingleValue>
        );
    };

// Custom React Select Styles

    const customStyles = {
        menu: styles => ({
            ...styles,
            width: '360px',
        }),
        container: provided => ({
            ...provided,
            width: '103px',
            margin: '2px 0 0 3px',
        }),
        control: (provided, state) => ({
            ...provided,
            height: '56.6px',
            minHeight: '0px',
            maxWidth: '83px',
            border: state.selectProps.menuIsOpen ? '1px solid transparent' : 'transparent',
            borderImage: state.selectProps.menuIsOpen ? 'linear-gradient(145deg, rgba(54,122,225,1) 48%, rgba(113,168,252,1) 100%)' : 'transparent',
            borderImageSlice: state.selectProps.menuIsOpen ? '1' : 'transparent',
            ':hover': {
                cursor: 'pointer'
            },
            boxShadow: state.selectProps.menuIsOpen ? '0 0 0 1.5px #2684FF' : 'transparent',
        }),
        dropdownIndicator: (provided, state)=> ({
            ...provided,
            width: '32.5px',
            height: '20px',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            padding: '0px',
            justifyContent: 'center',
        }),
        indicatorSeparator: provided => ({
            ...provided,
            display: 'none',
        }),
        indicatorContainer: provided => ({
            ...provided,
            display: 'flex',
            justifyContent: 'center',
        }),
        input: (provided) => ({
            ...provided,
            caretColor: 'transparent',
        }),
        valueContainer: provided => ({
            ...provided,
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row-reverse',
        }),
        placeholder: provided => ({
            ...provided,
            marginTop: '2px',
        }),
        singleValue: provided => ({
            ...provided,
            marginTop: '2px',
            minHeight: "100%",
            minWidth: "100%",
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#deebff' : '',
        }),
    };

// Placeholder Content

    const placeholderContent = usersCountryFlagSVG ? (
        <img
            src={require(`../images/flags/${usersCountryFlagSVG}`)}
            alt="Flag"
            width="24"
            height="16"
        />
    ) : (
        <img    
            src={GBSVG} 
            alt="Flag" 
            width="24" 
            height="16" 
        />
    );

// Custom Options

    useEffect(() => {
        const newTopOption = selectedOption ? selectedOption.value : (countries.find(country => country.svg === countryFromAPI.svg) || { name: "United Kingdom" }).name;
        setTopOption(newTopOption);
        const newFilteredCountries = countries.filter(country => country.name !== newTopOption.name);
        setFilteredCountries(newFilteredCountries);
        console.log("selectedOption:", selectedOption);
    }, [selectedOption, countries, countryFromAPI]);

    useEffect(() => {
        const countryOption = countries.find(country => country.svg === countryFromAPI.svg);
        if (countryOption) {
            setSelectedOption({
                value: countryOption,
                label: countryOption.name
            });
        }
    }, [countryFromAPI, countries]);

    const customOptions = [
        // top option
        {
            value: topOption,
            label: (
                <div>
                {selectedOption ? (
                    <img
                        src={require(`../images/flags/${selectedOption.value.svg || 'gb2.svg'}`)}
                        className="flag-image"
                        alt={`${selectedOption.value.name} flag`}
                        width="24"
                        height="16"
                    />
                ) : (
                    <img
                        src={require(`../images/flags/${countryFromAPI.svg || 'gb2.svg'}`)}
                        className="flag-image"
                        alt={`${countryFromAPI.name || 'GB'} flag`}
                        width="24"
                        height="16"
                    />
                )}
                <span className='country-option'>
                    {selectedOption && selectedOption.value ? (
                        `${selectedOption.value.name} (${selectedOption.value.dialingCode})`
                    ) : (
                        `${usersCountryFlagSVG ? countries.find(country => country.svg === usersCountryFlagSVG).name : 'United Kingdom'} (${usersCountryFlagSVG ? countries.find(country => country.svg === usersCountryFlagSVG).dialingCode : '+44'})`
                    )}
                </span>
                </div>
            ),
        },
        // Add the rest of the countries
        ...filteredCountries.map((country) => ({
            value: country,
            label: (
                <div>
                    <img
                    src={require(`../images/flags/${country.svg}`)}
                    className="flag-image"
                    alt={`${country.name} flag`}
                    width="24"
                    height="16"
                    />
                    <span className='country-option'>
                        {country.name} ({country.dialingCode})
                    </span>
                </div>
            ),
        })),
    ];

// Handle Next Click

    const handleNextClick = () => {
        const phoneNumberInput = document.getElementById('phoneNumberInput');
        if (phoneNumber === '') {
        setError("phoneNumberEmpty");
        phoneNumberInput.focus();
        } else if (/[^0-9]/.test(phoneNumber)) {
        // Check if the phoneNumber contains unallowed characters
        setError("incorrectFormat");
        phoneNumberInput.focus();
        } else {
            const isPhoneNumberAlreadyRegistered = users.some(user => user.phoneNumber === phoneNumber);
            
            if(isPhoneNumberAlreadyRegistered) {
                setError("alreadyRegistered"); 
            } else {
                setFormattedPhoneNumber(selectedOption.value.dialingCode + phoneNumber);
                setError(null);
            }
        }; 
    };

    //         } else {
    //             updateUser({ phoneNumber: phoneNumber })
    //             setPhoneNumber('');
    //             console.log("phoneNumber:", phoneNumber);   
    //             navigate('/add-recovery-email');
    //         }
    //     }
    // };
    
    useEffect(() => {
        const sendVerificationCode = async () => {
            try {
                const response = await axios.post('http://localhost:3001/send-verification-code', {
                    formattedPhoneNumber: formattedPhoneNumber,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const data = response.data;
    
                if (data.verificationCode) {
                    // Extract the verification code from the Twilio response
                    const verificationCode = data.verificationCode.toString();
    
                    // Set the verification code in the state
                    setTwilioVerificationCode(verificationCode);
    
                    console.log('Verification code sent successfully:', verificationCode);
                    // Proceed to the next step or navigate to the next page
                } else {
                    if (data.error) {
                        console.error('Error sending verification code:', data.error);
                        // Display an error message or take appropriate action
                    } else {
                        console.error('Unknown error sending verification code');
                    }
                }
            } catch (error) {
                console.error('Error sending verification code:', error);
                // Handle the case where there was a network error or any other unexpected error
            }
        };
    
        if (formattedPhoneNumber) {
            sendVerificationCode();
            setShowVerificationCodeInput(true);
        }
    }, [formattedPhoneNumber]);

    useEffect(() => {
        console.log("formattedPhoneNumber:", formattedPhoneNumber);
    }, [formattedPhoneNumber]);

// Verification Code (Twilio SMS)

    const handleUserVerificationCodeInput = (userInputtedVerificationCode) => {
        setUserInputtedVerificationCode(userInputtedVerificationCode);
        console.log("userInputtedVerificationCode:", userInputtedVerificationCode);
    }

    useEffect(() => {
        if (userInputtedVerificationCode === twilioVerificationCode) {
            updateUser({ phoneNumber: formattedPhoneNumber });
            setUserInputtedVerificationCode('');
            // navigate('/add-recovery-email');
        }
    }, [userInputtedVerificationCode]);

    return (
        <>
            <ConfirmYoureNotARobotComponent
                value={phoneNumber}
                setValue={setPhoneNumber}
                handleNextClick={handleNextClick}
                isImagePreloaded={isImagePreloaded}
                customOptions={customOptions}
                countries={countries}
                customStyles={customStyles}
                userIP={userIP}
                customDropdownIndicator={customDropdownIndicator}
                chosenCountryFlagImage={chosenCountryFlagImage}
                placeholderContent={placeholderContent}
                selectedOption={selectedOption}
                handleSelectPhoneNumber={handleSelectPhoneNumber}
                isImageLoaded={isImageLoaded}
                handleCountrySelect={handleCountrySelect}
                errorCondition={errorCondition}
                actualSelectedOption={actualSelectedOption}
                handleUserVerificationCodeInput={handleUserVerificationCodeInput}
                userInputtedVerificationCode={userInputtedVerificationCode}
                showVerificationCodeInput={showVerificationCodeInput}
                formattedPhoneNumber={formattedPhoneNumber}
            />
        </>
    )
}
