import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BirthdayAndGenderComponent } from '../components/BirthdayAndGenderComponent';
import useImagePreload from "../hooks/useImagePreload";
import errorImage from '../images/Daco_5575399.png';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const BirthdayAndGenderContainer = ({ updateUser }) => {

    const [month, setMonth] = useState('');
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");
    const [genderEmpty, setGenderEmpty] = useState(false);
    const [errorCondition, setErrorCondition] = useState(null);
    const [isMonthFocused, setIsMonthFocused] = useState(false);
    const [isDayFocused, setIsDayFocused] = useState(false);
    const [isYearFocused, setIsYearFocused] = useState(false);
    const [isGenderFocused, setIsGenderFocused] = useState(false);

    const navigate = useNavigate();

    const isImagePreloaded = useImagePreload(errorImage);

// Month

    const handleSelectMonth = (event) => {
        setMonth(event.target.value);
    };

    const toggleIsMonthFocused = () => {
            setIsMonthFocused(true);
    }

    const handleMonthBlur = () => {
        setIsMonthFocused(false); 
    };

// Day

    const handleSelectDay = (event) => {
        const inputDay = event.target.value;
        const maxDayLength = 2;
        if (inputDay.length <= maxDayLength) {
            setDay(inputDay);
        }
    };

    const toggleIsDayFocused = () => {
        setIsDayFocused(true);
    }

    const handleDayBlur = () => {
        setIsDayFocused(false); 
    };

// Year

    const handleSelectYear = (event) => {
        const inputYear = event.target.value;
        const maxYearLength = 4;
        if (inputYear.length <= maxYearLength) {
            setYear(inputYear);
        }
    };

    const toggleIsYearFocused = () => {
        setIsYearFocused(true);
    }

    const handleYearBlur = () => {
        setIsYearFocused(false); 
    };

// Gender

    const handleSelectGender = (event) => {
        setGender(event.target.value);
    };

    const toggleIsGenderFocused = () => {
        setIsGenderFocused(true);
    }

    const handleGenderBlur = () => {
        setIsGenderFocused(false); 
    };

// Error Messages

    const birthdayError = () => setErrorCondition('incompleteBirthday');

    const wrongFormat = () => setErrorCondition('isWrongFormat');
    
    const genderError = () => setGenderEmpty(true);

// Handle Next Click

    const handleNextClick = () => {
        const isBirthdayEmpty = month === '' || day === '' || year === '';
        const isGenderEmpty = gender === '';
        const numericDay = +day;
        const numericYear = +year;
        if (isBirthdayEmpty) {
            birthdayError();
        } if (isGenderEmpty) {
            genderError();
        } if (!isBirthdayEmpty && !isGenderEmpty) {
            updateUser({month: month, day: day, year: year, gender: gender})
            navigate('/choose-your-gmail-address')
        } if (isNaN(numericDay) || isNaN(numericYear)) {
            wrongFormat();
        }
    };

// Custom MUI Button Styles and Functions

const CustomNextButton = styled(Button)({
    backgroundColor: 'rgb(26,115,232)',
    border: '2px solid rgb(26,115,232)',
    color: 'white',
    padding: '3px 21.59px',
    fontSize: '15px',
    '&:hover': {
        backgroundColor: 'rgb(34 106 202)',
        boxShadow: ('0 1px 2px 0 rgba(60, 64, 67, .3)', 
                    '0 1px 3px 1px rgba(60, 64, 67, .15)'),
        border: '2px solid rgb(34 106 202)',    
        '& .MuiTouchRipple-child': {
            backgroundColor: 'rgb(33 88 161)', // Change this to your desired ripple color
          },
    },
    textTransform: 'none',
    margin: 'margin: 7px 1.5px 20px 0;'
});

    return (
        <BirthdayAndGenderComponent
            month={month}
            handleMonthBlur={handleMonthBlur}
            handleSelectMonth={handleSelectMonth}
            day={day}
            handleDayBlur={handleDayBlur}
            handleSelectDay={handleSelectDay}
            year={year}
            handleYearBlur={handleYearBlur}
            handleSelectYear={handleSelectYear}
            gender={gender}
            handleGenderBlur={handleGenderBlur}
            handleSelectGender={handleSelectGender}
            handleNextClick={handleNextClick}
            isImagePreloaded={isImagePreloaded}
            genderEmpty={genderEmpty}
            errorCondition={errorCondition}
            toggleIsMonthFocused={toggleIsMonthFocused}
            isMonthFocused={isMonthFocused}
            toggleIsDayFocused={toggleIsDayFocused}
            isDayFocused={isDayFocused}
            toggleIsYearFocused={toggleIsYearFocused}
            isYearFocused={isYearFocused}
            toggleIsGenderFocused={toggleIsGenderFocused}
            isGenderFocused={isGenderFocused}
            CustomNextButton={CustomNextButton}
        />
    );
}
