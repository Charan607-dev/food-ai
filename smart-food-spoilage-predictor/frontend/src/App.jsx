import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Login from "./pages/Login";


function App() {

    const savedUser = localStorage.getItem(
        "food_spoilage_current_user"
    );


    const [userName, setUserName] =
        useState(savedUser);


    const [currentPage, setCurrentPage] =
        useState("dashboard");


    // ==========================================
    // LOGIN
    // ==========================================

    function handleLogin(name) {

        localStorage.setItem(
            "food_spoilage_current_user",
            name
        );

        setUserName(name);

        setCurrentPage("dashboard");
    }


    // ==========================================
    // NAVIGATION
    // ==========================================

    function handleNavigate(page) {
        setCurrentPage(page);
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem(
            "food_spoilage_current_user"
        );

        setUserName(null);

        setCurrentPage("dashboard");
    }


    // ==========================================
    // SHOW LOGIN IF USER IS NOT LOGGED IN
    // ==========================================

    if (!userName) {

        return (
            <Login
                onLogin={handleLogin}
            />
        );
    }


    // ==========================================
    // MAIN APPLICATION
    // ==========================================

    return (

        <div className="app">

            <Navbar
                currentPage={currentPage}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
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