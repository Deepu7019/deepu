
import React from "react";
import ReactDOM from "react-dom/client";
import DisplayInventory from "./to_inventory";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <DisplayInventory />
    </React.StrictMode>
);
