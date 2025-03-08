import React from "react";
import "./global.css";
import Formlogin from "./Formlogin";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Formlogin />
      <Toaster />
    </>
  );
};

export default App;
