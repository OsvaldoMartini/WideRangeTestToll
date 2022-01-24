import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from './Header/Header';
import Footer from './components/Footer/Footer';

import { Example } from './Example/Example';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router basename="example">
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<Example />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );

}

export default App;