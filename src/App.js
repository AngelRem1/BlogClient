import React from "react";
import { Route, Routes } from "react-router-dom";

// importing components
import Navbar from "./components/navbar";
import JournalList from "./components/list";
import Edit from "./components/edit";
import Add from "./components/add";
import SignUp from "./components/signup";
import Login from "./components/login";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<JournalList />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
