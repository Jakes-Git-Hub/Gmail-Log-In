import React, { useState, useEffect } from 'react';
import { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ConfirmYoureNotARobotComponent } from '../components/ConfirmYoureNotARobotComponent';
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { countries } from '../utils/countryDropDownOptions';
import axios from 'axios';
import dropDownImageSVG from '../images/drop-down-svg.svg';
import { customOptions } from '../utils/countryDropDownOptions';
import GBSVG from '../images/flags/gb2.svg';

export const ConfirmYoureNotARobotContainer = ({ updateUser, users, userIP }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberPlaceholder, setPhoneNumberPlaceholder] = useState("Phone Number");
    const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
    const [isIncorrectFormat, setIsIncorrectFormat] = useState(false);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [usersCountryFlagSVG, setUsersCountryFlagSVG] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [usersCountry, setUsersCountry] = useState('');
    // const [customOptions, setCustomOptions] = useState([]);

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
                    setUsersCountry(matchingCountry);
                }
                console.log(`User's country: ${countryFromIP}`);
            })
            .catch((error) => {
                console.error('Error fetching geolocation data:', error);
            });
        } else {
            console.log("didn't work, or still waiting for IP API request");
        }
    }, [userIP]);

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
            navigate('/add-recovery-email')
            }
        }
    };

// Custom Components

    const CustomDropdownIndicator = ({ menuIsOpen, innerProps, ...rest }) => {
        const defaultColor = '#000';
    
        return (
        <components.DropdownIndicator {...innerProps} { ...rest }>
            <img
            src={dropDownImageSVG}
            alt="Dropdown Indicator"
            className={`svg dropdown-indicator ${menuIsOpen ? 'open' : ''}`}
            style={{ fill: defaultColor }}
            />
        </components.DropdownIndicator>
        );
    };

    const chosenCountryFlagImage = ({ children, ...props }) => {
        return (
        <components.SingleValue {...props}>
            <img
                src={require(`../images/flags/${props.data.value.svg}`)}
                className="flag-image"
                alt={`${props.data.value.name} flag`}
                id="react-select-2-placeholder"
            />
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
            marginLeft: '3px',
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
            ':hover': {
                // Add styles for hover here
                // For example, you can change the color on hover:
                fill: '#ff0000', // Change this to your desired color
              },
              '&.menu-is-open': {
                // Add styles for when the menu is open here
                // For example, you can change the color when the menu is open:
                fill: '#00ff00', // Change this to your desired color
              },
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
        }),
    }
  
// Handle Skip

    const handleSkip = () => navigate('/review-your-account-info');


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

    return (
        <>
            <ConfirmYoureNotARobotComponent
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
                customOptions={customOptions}
                countries={countries}
                customStyles={customStyles}
                userIP={userIP}
                usersCountryFlagSVG={usersCountryFlagSVG}
                CustomDropdownIndicator={CustomDropdownIndicator}
                chosenCountryFlagImage={chosenCountryFlagImage}
                setPhoneNumber={setPhoneNumber}
                placeholderContent={placeholderContent}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
            />
        </>
    )
    
}