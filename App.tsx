import React from "react";
import Root from "./Root";
import { Provider } from "react-redux";
import { store } from "./app/base/store";
import { NotificationsProvider } from "./containers/NotificationsProvider";

function App() {

    return (
        <>
            <Provider store={store}>
                <NotificationsProvider>
                    <Root />
                </NotificationsProvider>
            </Provider>
        </>

    )
}

export default App
