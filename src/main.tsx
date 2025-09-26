import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/tailwind.css";
import App from "./components/app/app.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.jsx";
import { Provider } from "react-redux";
import ScrollToTop from "./components/ui/scrollToTop";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
