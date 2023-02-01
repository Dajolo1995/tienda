import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./utils/i18next";

import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
