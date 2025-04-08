import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./theme";
import { LanguageProvider } from "./Provider/language";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { injectStore } from "@/utils/authorizeAxios";

// Inject Redux store into axios
injectStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
