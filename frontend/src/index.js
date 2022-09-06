import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
// https://stackoverflow.com/a/66791494/15673653
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store/store";
import { theme } from "./theme";
import axios from "axios";

axios.defaults.baseURL = "https://mohit-nike-clone.herokuapp.com/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
