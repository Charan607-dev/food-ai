import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";


function App() {
    const [currentPage, setCurrentPage] =
        useState("dashboard");


    function handleNavigate(page) {
        setCurrentPage(page);
    }


    return (
        <div className="app">

            <Navbar
                currentPage={currentPage}
                onNavigate={handleNavigate}
            />

            <main className="app-content">

                {currentPage === "dashboard" && (
                    <Dashboard />
                )}

                {currentPage === "history" && (
                    <History />
                )}

            </main>

        </div>
    );
}


export default App;