import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ERC20App } from './ERC20';
import { MPApp } from './MPApp';

const container = document.getElementById("app");
const root = createRoot(container)
// root.render(<App />);
root.render(<MPApp />);
