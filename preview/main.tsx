import { createRoot } from "react-dom/client";
import "./preview.css";
import { App } from "./App";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")!).render(<App />);
