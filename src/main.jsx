import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// StrictMode double-invokes useEffect which breaks GSAP animations
// Remove it so GSAP behaves exactly like in the original HTML's DOMContentLoaded
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
