import { createRoot } from "react-dom/client";
import Router from "./utils/Routers.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <Router />
  </>
);
