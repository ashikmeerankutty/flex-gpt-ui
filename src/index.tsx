import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import {Theme} from '@twilio-paste/core/theme';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme.Provider theme="default">
      <App />
    </Theme.Provider>
  </React.StrictMode>
);
