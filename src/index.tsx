import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import "./index.css";
import App from "./App";

const GlobalStyle = createGlobalStyle`
 body{ margin: 0;
  padding: 0;
  box-sizing: border-box;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
