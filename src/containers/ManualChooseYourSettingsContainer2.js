import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ManualChooseYourSettingsComponent2 } from "../components/ManualChooseYourSettingsComponent2";
import googleWritingSvg from "../images/google-writing-svg.svg";
import errorImage from '../images/Daco_5575399.png';
import useImagePreload from "../hooks/useImagePreload";
import { useSpring } from 'react-spring';

export const ManualChooseYourSettingsContainer2 = ({ userData, updateUser, text }) => {

    const [manualSetting2, setManualSetting2] = useState("");
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [errorCondition, setErrorCondition] = useState("");
    const [showYouTubeHistoryModal, setShowYouTubeHistoryModal] = useState(false);
    const [modalCondition, setModalCondition] = useState('closed');

    const navigate = useNavigate();

// Check for Image Loads

    const isImagePreloaded = useImagePreload(errorImage);

    useEffect(() => {
        const image = new Image();
        image.src = googleWritingSvg;
        image.onload = () => {
          setIsImageLoaded(true);
        };
    }, []);

// Add Overflow Body CSS

    useEffect(() => {
        // Remove the existing id from the body
        document.body.removeAttribute('id');

        // Add a new id to the body
        document.body.id = 'body-overflow';

        // Remove the new id when the component unmounts
        return () => {
            document.body.removeAttribute('id');
        };
    }, []);

// Handle Modals

    const toggleModalCondition = condition => setModalCondition(condition);

    const openYouTubeHistoryModal = () => {
        setShowYouTubeHistoryModal(true);
        toggleModalCondition('opening');
    };

    const closeYouTubeHistoryModal = () => {
        toggleModalCondition('closing');
        setTimeout(() => {
            toggleModalCondition('closed');
            setShowYouTubeHistoryModal(false);
        }, 275);
    };

    const animationOpen = useSpring({
        transform: modalCondition === 'opening' ? `scale(1)` : `scale(0.85)`,
        config: {
          duration: 175,
          easing: t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
        }
    });

    const animationClose = useSpring({
        transform: modalCondition === 'closing' ? `scale(0.85)` : `scale(1)`,
        config: {
          duration: 275,
          easing: t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
        }
    });

// Change Language

    const handleLanguageSelection = async (e) => {
        e.preventDefault();
        const chosenLanguage = e.target.value;
        updateUser({ language: chosenLanguage })
    };

// Handle Radio Change

    const handleRadioChange = (e) => {
        setManualSetting2(e.target.value);
        if (errorCondition === "selectAnOption") {
            setErrorCondition("");
        }
    }

// Errors

    const setError = (error) => setErrorCondition(error);

// Handle Next & Back Click

    const handleNextClick = (e) => {
        e.preventDefault();
        if (manualSetting2 === "") {
            setError("selectAnOption");
        } if (manualSetting2 === "keep until delete") {
            updateUser({ manualSetting2: "keep until delete" });
            navigate("/manual-choose-your-settings3")
        } if (manualSetting2 === "36 months or delete") {
            updateUser({ manualSetting2: "18 months or delete" });
            navigate("/manual-choose-your-settings3")
        } if (manualSetting2 === "dont save") {
            updateUser({ manualSetting2: "dont save" });
            navigate("/manual-choose-your-settings3")
        }
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        navigate("/manual-choose-your-settings")
    };

    return(
        <>
            <ManualChooseYourSettingsComponent2
                handleNextClick={handleNextClick}
                isImageLoaded={isImageLoaded}
                userData={userData}
                manualSetting2={manualSetting2}
                handleRadioChange={handleRadioChange}
                errorCondition={errorCondition}
                isImagePreloaded={isImagePreloaded}
                handleLanguageSelection={handleLanguageSelection}
                text={text}
                openYouTubeHistoryModal={openYouTubeHistoryModal}
                closeYouTubeHistoryModal={closeYouTubeHistoryModal}
                showYouTubeHistoryModal={showYouTubeHistoryModal}
                modalCondition={modalCondition}
                animationOpen={animationOpen}
                animationClose={animationClose}
                handleBackClick={handleBackClick}
            />
        </>
    );
};
