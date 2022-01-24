import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Header/Header';
import Footer from './components/Footer/Footer';

import { SubjectSummary } from './SubjectSummary/SubjectSummary';
import { SubjectRedirect } from './SubjectRedirect/SubjectRedirect';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router basename="subject">
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<SubjectSummary />} />
          <Route path="/redirect" element={<SubjectRedirect />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
