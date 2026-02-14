import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react"
import { ThemeProvider } from "./components/theme-provider"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MTThemeProvider>
        <ThemeProvider
          defaultTheme="system"
          storageKey="vite-ui-theme"
          attribute="class"
        >
          <App />
        </ThemeProvider>
      </MTThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
