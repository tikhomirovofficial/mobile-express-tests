import React from "react";
import Root from "./Root";
import { Provider } from "react-redux";
import { store } from "./app/base/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { cs } from "./common/styles";
import { BottomSheet } from "./components/BottomSheet";


function App() {
    return (
        <GestureHandlerRootView style={[cs.flexOne]}>
            <Provider store={store}>
                <Root />
            </Provider>
            <BottomSheet/>
        </GestureHandlerRootView>


    )
}

export default App
