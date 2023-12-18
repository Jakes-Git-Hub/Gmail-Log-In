import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BirthdayAndGenderComponent } from '../components/BirthdayAndGenderComponent';
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import googleWritingSvg from "../images/google-writing-svg.svg";

export const BirthdayAndGenderContainer = ({ updateUser }) => {

    const [month, setMonth] = useState('');
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");
    const [genderEmpty, setGenderEmpty] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);  
    const [isCustomChecked, setIsCustomChecked] = useState(false);
    const [customGender, setCustomGender] = useState("");
    const [isWhatsYourCustomGenderInputEmpty, setIsWhatsYourCustomGenderInputEmpty] = useState(false);


    const navigate = useNavigate();

    const isImagePreloaded = useImagePreload(errorImage);

    // Checks if Google SVG is Loaded, to Render All at Once

    useEffect(() => {
        const image = new Image();
        image.src = googleWritingSvg;
        image.onload = () => {
          setIsImageLoaded(true);
        };
    }, []);

// Month

    const handleSelectMonth = (event, day, year) => {
        setMonth(event.target.value);
        if (day && year) {
            setErrorCondition(null);
        }
    };

// Day

    const handleSelectDay = (event, year, month) => {
        const inputDay = event.target.value;
        const maxDayLength = 2;
        if (inputDay.length <= maxDayLength) {
            setDay(inputDay);
            if (month && year && year.length === 4 && !isNaN(Number(year)) && !isNaN(Number(inputDay))) {
                setErrorCondition(null);
            } 
        }
    };

// Year

    const handleSelectYear = (event, day, month) => {
        const inputYear = event.target.value;
        setYear(inputYear);
        if (inputYear.length === 4 && month && day && day.length === 2 && !isNaN(Number(day)) && !isNaN(Number(inputYear))) {
                setErrorCondition(null);
        }
    };

// Gender

    const handleSelectGender = (event) => {
        setGender(event.target.value);
        setGenderEmpty(false);
    };

// Custom Gender

    const handleSelectCustomGender = (e) => {
        setCustomGender(e.target.value);
    };

// Error Messages

    const birthdayError = () => setErrorCondition('incompleteBirthday');

    const wrongFormat = () => setErrorCondition('isWrongFormat');
    
    const genderError = () => setGenderEmpty(true);

// Handle Next Click

    const handleNextClick = () => {
        const isGenderEmpty = gender === '';
        const numericDay = +day;
        const numericYear = +year;
        const isBirthdayEmpty = month === '' || day === '' || year === '';
        const isCustomGenderEmpty = customGender === '';
        if (isBirthdayEmpty) {
            birthdayError();
        } if (isGenderEmpty) {
            genderError();
        } if (!isBirthdayEmpty && !isGenderEmpty && !isNaN(numericDay) && !isNaN(numericYear)) {
            updateUser({month: month, day: day, year: year, gender: gender})
            navigate('/choose-your-gmail-address')
        } if (!isBirthdayEmpty && (isNaN(numericDay) || isNaN(numericYear) || year.length < 4)) {
            wrongFormat();
        } if (isCustomGenderEmpty) {
            setIsWhatsYourCustomGenderInputEmpty(true)
        }
    };

// Custom MUI Styles

    const CustomNextButton = styled(Button)({
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '5px 23.59px',
        fontSize: '15px',
        boxShadow: "none",
        '&:hover': {
            backgroundColor: 'rgb(34 106 202)',
            boxShadow: ('0px 3px 1px -2px rgba(0,0,0,0.2)', '0px 2px 2px 0px rgba(0,0,0,0.14)', '0px 1px 5px 0px rgba(0,0,0,0.12)'),    
            '& .MuiTouchRipple-child': {
                backgroundColor: 'rgb(30 81 147)', // Change this to your desired ripple color
            },
        },
        textTransform: 'none',
        margin: 'margin: 7px 1.5px 20px 0;'
    });

    return (
        <BirthdayAndGenderComponent
            month={month}
            handleSelectMonth={handleSelectMonth}
            day={day}
            handleSelectDay={handleSelectDay}
            year={year}
            handleSelectYear={handleSelectYear}
            gender={gender}
            handleSelectGender={handleSelectGender}
            handleNextClick={handleNextClick}
            isImagePreloaded={isImagePreloaded}
            genderEmpty={genderEmpty}
            errorCondition={errorCondition}
            CustomNextButton={CustomNextButton}
            isImageLoaded={isImageLoaded}
            customGender={customGender}
            isWhatsYourCustomGenderInputEmpty={isWhatsYourCustomGenderInputEmpty}
            handleSelectCustomGender={handleSelectCustomGender}
        />
    );
};
