import React, { useEffect, useState, FC } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { WifiProblem } from '../../pages/Problems/WifiProblem';
import { HasNodeChildren } from '../../types/common.types';

export const WithNetwork: FC<HasNodeChildren> = ({ children }) => {
    const [connected, setConnected] = useState(true)

    const refreshNetState = () => {
        NetInfo.fetch().then(state => {
            setConnected(state.isConnected || false)
        });
    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => setConnected(state.isConnected || false));

        return () => {
            unsubscribe();
        }

    }, [])

    return <>
        {
            connected ? children : <WifiProblem refreshState={refreshNetState} />
        }
    </>
}
