import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import { keyStores } from "near-api-js";

export const keyStore = new keyStores.BrowserLocalStorageKeyStore();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
