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
    const [stateOfMonth, setStateOfMonth] = useState(null);
    const [stateOfDay, setStateOfDay] = useState(null);
    const [stateOfYear, setStateOfYear] = useState(null);

    const navigate = useNavigate();

    const isImagePreloaded = useImagePreload(errorImage);

// Month

    const handleSelectMonth = (event, day, year) => {
        setMonth(event.target.value);
        setStateOfMonth('selectedMonth')
        if (day && year) {
            setErrorCondition(null);
        }
    };

    const toggleIsMonthFocused = () => {
        setIsMonthFocused(true);
    }

    const handleMonthBlur = () => {
        setIsMonthFocused(false); 
    };

// Day

    const handleSelectDay = (event, year, month) => {
        const inputDay = event.target.value;
        const maxDayLength = 2;
        if (inputDay.length <= maxDayLength) {
            setDay(inputDay);
            if (month && year) {
                setErrorCondition(null);
            } 
        }
        if (inputDay.length === 0) {
            setStateOfDay('empty')
        }
        if (inputDay.length !== 0) {
            setStateOfDay('notEmpty')
        }
    };

    const toggleIsDayFocused = () => {
        setIsDayFocused(true);
    }

    const handleDayBlur = () => {
        setIsDayFocused(false); 
    };

// Year

    const handleSelectYear = (event, day, month) => {
        const inputYear = event.target.value;
        setYear(inputYear);
        if (inputYear.length === 4 && month && day) {
                setErrorCondition(null);
        }
        if (inputYear.length > 0) {
            setStateOfYear('notEmpty')
        }
        if (inputYear.length === 0) {
            setStateOfYear('empty')
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
        setGenderEmpty(false);
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
        const isGenderEmpty = gender === '';
        const numericDay = +day;
        const numericYear = +year;
        const isBirthdayEmpty = month === '' || day === '' || year === '';
        if (isBirthdayEmpty) {
            birthdayError();
        } if (isGenderEmpty) {
            genderError();
        } if (!isBirthdayEmpty && !isGenderEmpty && day === isNaN(numericDay && year === isNaN(numericYear)) ) {
            updateUser({month: month, day: day, year: year, gender: gender})
            navigate('/choose-your-gmail-address')
        } if (isNaN(numericDay) || isNaN(numericYear) || year.length < 4) {
            wrongFormat();
        } if (month === '') {
            setStateOfMonth('emptyMonth')
        } 
    };

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
            stateOfMonth={stateOfMonth}
            stateOfDay={stateOfDay}
            stateOfYear={stateOfYear}
        />
    );
};
