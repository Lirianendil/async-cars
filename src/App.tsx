import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import Garage from "./pages/Garage";
import Winners from "./pages/Winners";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
                <nav style={{ marginBottom: '16px' }}>
                    <Link to="/garage" style={{ marginRight: '10px' }}>Garage</Link>
                    <Link to="/winners">Winners</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/garage" />} />
                    <Route path="/garage" element={<Garage />} />
                    <Route path="/winners" element={<Winners />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;