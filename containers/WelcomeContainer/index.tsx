import React, {FC, useEffect} from 'react';
import WelcomePatients from "../../pages/WelcomePatients";
import WelcomeConditions from "../../pages/WelcomeConditions";
import WelcomeCooperation from "../../pages/WelcomeCooperation";
import {useAppSelector} from "../../app/base/hooks";
import {NavProps} from "../../types/common.types";

const welcomeSteps = [
    WelcomePatients,
    WelcomeConditions,
    WelcomeCooperation,
]

const WelcomeContainer: FC<NavProps> = ({navigation}) => {
    const {welcomeStep} = useAppSelector(state => state.welcome)
    const CurrentWelcomeStep = welcomeSteps[welcomeStep]

    return (
        <CurrentWelcomeStep navigation={navigation}/>
    );
};

export default WelcomeContainer;