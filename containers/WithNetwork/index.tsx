import React, { useEffect, useState, ReactNode, FC } from 'react'
import { Text } from 'react-native'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { WifiProblem } from '../../pages/Problems/WifiProblem';

type WithNetworkProps = {
    children: ReactNode
}
export const WithNetwork: FC<WithNetworkProps> = ({ children }) => {
    const [connected, setConnected] = useState(false)

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
