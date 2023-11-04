import React, {useEffect} from 'react';
import WelcomePatients from "../../pages/WelcomePatients";
import WelcomeConditions from "../../pages/WelcomeConditions";
import WelcomeCooperation from "../../pages/WelcomeCooperation";
import {useAppSelector} from "../../app/base/hooks";

const welcomeSteps = [
    WelcomePatients,
    WelcomeConditions,
    WelcomeCooperation,
]

const WelcomeContainer = () => {
    const {welcomeStep} = useAppSelector(state => state.welcome)
    const CurrentWelcomeStep = welcomeSteps[welcomeStep]

    return (
        <CurrentWelcomeStep/>
    );
};

export default WelcomeContainer;