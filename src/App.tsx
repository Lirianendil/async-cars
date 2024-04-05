import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Garage from './components/Garage';
import Winners from './components/Winners';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/garage" />} />
                <Route path="/garage" element={<Garage />} />
                <Route path="/winners" element={<Winners />} />
            </Routes>
        </Router>
    );
};

export default App