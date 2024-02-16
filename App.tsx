import React from "react";
import Root from "./Root";
import { Provider } from "react-redux";
import { store } from "./app/base/store";

function App() {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    )
}

export default App
