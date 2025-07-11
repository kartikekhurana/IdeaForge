import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <>
        <Toaster position='top-right' reverseOrder={false} />
        <App />
      </>
    </AuthProvider>
  </ThemeProvider>
);
