import React, { useState, useEffect } from 'react';
import { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { AddPhoneNumberComponent } from '../components/AddPhoneNumberComponent';
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { countries, customOptions } from '../utils/countryDropDownOptions';
import axios from 'axios';
import dropDownImageSVG from '../images/drop-down-svg.svg';

export const AddPhoneNumberContainer = ({ updateUser, users, userIP }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberPlaceholder, setPhoneNumberPlaceholder] = useState("Phone Number");
    const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
    const [isIncorrectFormat, setIsIncorrectFormat] = useState(false);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);
    const [usersCountryFlagSVG, setUsersCountryFlagSVG] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectionMade, setIsSelectionMade] = useState(false);
    const [usersCountryObject, setUsersCountryObject] = useState({});
    const [loadingOptions, setLoadingOptions] = useState(true);

    const navigate = useNavigate();

// Loads Error Image

    const isImagePreloaded = useImagePreload(errorImage);

// Get User's Country from IP and Set Placeholder SVG Based on it

useEffect(() => { 
    if (userIP) {
        const apiKey = 'b2ef0251b1264f88ae869467dfe144d8';

        axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=200.7.98.19`)
        .then((response) => {
            const countryFromIP = response.data.country_name;
            const matchingCountry = countries.find(country => country.name === countryFromIP);
            if (matchingCountry) {
                setUsersCountryFlagSVG(matchingCountry.svg);
                setUsersCountryObject(matchingCountry);
                setLoadingOptions(false);
                console.log(matchingCountry);
            }
            console.log(`User's country: ${countryFromIP}`);
        })
        .catch((error) => {
            console.error('Error fetching geolocation data:', error);
            setLoadingOptions(false);
        });
    } else {
        console.log("Still waiting for IP API request or, didn't work");
    }
}, [userIP]);

useEffect(() => {
    console.log(usersCountryObject);
}, [usersCountryObject]);

// Add in Users Country as Top Separate Option

const usersCountryTopSeparateOptions = loadingOptions
    ? {
        value: 'loading',
        label: (
            <div>
                <img
                    src={require('../images/flags/gb.svg')}
                    className="flag-image"
                    alt={'GB flag'}
                />
                <span>
                    {usersCountryObject.name} ({usersCountryObject.dialingCode})
                </span>
            </div>
        ),
    } // Options are still loading, return an empty array or a loading indicator
    : [
            {
                value: usersCountryObject.dialingCode,
                label: (
                    <div className='users-country-top-option'>
                        <img
                            src={require(`../images/flags/${usersCountryObject.svg}`)}
                            className="flag-image"
                            alt={`${usersCountryObject.name} flag`}
                        />
                        <span className='country-option'>
                            {usersCountryObject.name} ({usersCountryObject.dialingCode})
                        </span>
                    </div>
                ),
            },
            {
                value: 'separator',
                label: (
                    <div className="separator">
                        {/* Your separator styling goes here */}
                    </div>
                ),
                isSeparator: true,
            },
            ...customOptions,
    ];

// phoneNumber

    const handlePhoneNumberClick = () => {
        setPhoneNumberPlaceholder("");
    };

    const handlePhoneNumberBlur = () => {
        if (phoneNumber === "") {
            setPhoneNumberPlaceholder("Phone Number");
        }
    };

// Error Messages

    const phoneNumberEmpty = () => setIsPhoneNumberEmpty(true);

    const incorrectFormat = () => setIsIncorrectFormat(true);

    const alreadyRegistered = () => setIsAlreadyRegistered(true);

// Handle Next Click

    const handleNextClick = () => {
        setIsPhoneNumberEmpty(false);
        setIsIncorrectFormat(false);
        setIsAlreadyRegistered(false);
        if (phoneNumber === '') {
        const phoneNumberInput = document.getElementById('phoneNumberInput');
        phoneNumberEmpty();
        phoneNumberInput.focus();
        } else if (!/^[a-zA-Z0-9.]+$/.test(phoneNumber)) {
        // Check if the phoneNumber contains unallowed characters
        incorrectFormat();
        console.log('correct regex')
        } else {
                const isPhoneNumberAlreadyRegistered = users.some(user => user.phoneNumber === phoneNumber);
                if(isPhoneNumberAlreadyRegistered) {
                    alreadyRegistered();    
                } else {
            updateUser({ phoneNumber: phoneNumber })
            setPhoneNumber('');
            setIsSelectionMade(true); 
            navigate('/add-recovery-email')
            }
        }
    };

// Custom Components

    const CustomDropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                    <img src={dropDownImageSVG} alt="Dropdown Indicator" className='svg dropdown-indicator' />
            </components.DropdownIndicator>
        );
    };

// Custom React Select Styles

    const customStyles = {
        menu: styles => ({
            ...styles,
            width: '360px',
            height: '365px',
            boxShadow: '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);',
        }),
        menuList: styles => ({
            ...styles,
            height: '365px',
            maxHeight: '800px',
        }),
        container: provided => ({
            ...provided,
            width: '103px',
            marginLeft: '3px',
        }),
        control: (provided, state) => ({
            ...provided,
            height: '33px',
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
        indicatorSeparator: provided => ({
            ...provided,
            display: 'none',
        }),
        indicatorContainer: provided => ({
            ...provided,
            display: 'flex',
            justifyContent: 'center',
        }),
        // more styles
        input: (provided) => ({
            ...provided,
            caretColor: 'transparent', // Hide the blinking cursor
        }),
        valueContainer: provided => ({
            ...provided,
            display: 'flex',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row-reverse',
        }),
        dropdownIndicator: (provided, state)=> ({
            ...provided,
            width: '32.5px', // Adjust the width to fit your image
            height: '20px', // Adjust the height to fit your image
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            padding: '0px',
            justifyContent: 'center',
            // backgroundColor: state.selectProps.menuIsOpen ? 'red' : 'none', *this works*
        }),
        placeholder: provided => ({
            ...provided,
            marginTop: '2px',
        }),
        option: (provided, state) => ({
            ...provided,
            height: state.data.isSeparator ? '2px' : '48px',
            display: 'flex',
            alignItems: 'center',
            ':hover': {
                cursor: state.data.isSeparator ? 'default' : 'pointer',
                backgroundColor: state.data.isSeparator ? 'white' : 'rgb(245 245 245)',
            },
        }),
    }
  
// Handle Skip

    const handleSkip = () => {
        setPhoneNumber('');
        setErrorCondition(null);
        navigate('/review-your-account-info');
    };

    return (
        <>
            <AddPhoneNumberComponent
                value={phoneNumber}
                setValue={setPhoneNumber}
                handlePhoneNumberClick={handlePhoneNumberClick}
                handlePhoneNumberBlur={handlePhoneNumberBlur}
                phoneNumberPlaceholder={phoneNumberPlaceholder}
                handleNextClick={handleNextClick}
                handleSkip={handleSkip}
                isPhoneNumberEmpty={isPhoneNumberEmpty}
                isImagePreloaded={isImagePreloaded}
                isIncorrectFormat={isIncorrectFormat}
                isAlreadyRegistered={isAlreadyRegistered}
                usersCountryTopSeparateOptions={usersCountryTopSeparateOptions}
                countries={countries}
                customStyles={customStyles}
                userIP={userIP}
                usersCountryFlagSVG={usersCountryFlagSVG}
                CustomDropdownIndicator={CustomDropdownIndicator}
                setIsOpen={setIsOpen}
                isSelectionMade={isSelectionMade}
            />
        </>
    )
    
}