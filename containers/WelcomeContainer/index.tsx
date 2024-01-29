import React, {FC, useEffect} from 'react';
import WelcomePatients from "../../pages/Welcome/WelcomePatients";
import WelcomeConditions from "../../pages/Welcome/WelcomeConditions";
import WelcomeCooperation from "../../pages/Welcome/WelcomeCooperation";
import {useAppSelector} from "../../app/base/hooks";
import {NavProps} from "../../types/common.types";

const welcomeSteps = [
    WelcomePatients,
    WelcomeConditions,
    WelcomeCooperation,
]
// const WelcomeRoute: FC<NavProps> = ({navigation}) => {
//     return (
        
//     )
// }
const WelcomeContainer: FC<NavProps> = ({navigation}) => {
    const {welcomeStep} = useAppSelector(state => state.welcome)
    const CurrentWelcomeStep = welcomeSteps[welcomeStep]

    return (
        <CurrentWelcomeStep navigation={navigation}/>
    );
};

export default WelcomeContainer;