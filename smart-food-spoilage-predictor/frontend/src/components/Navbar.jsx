function Navbar({
    currentPage,
    onNavigate,
    onLogout
}) {
    return (
        <nav className="navbar">

            <div
                className="navbar-brand"
                onClick={() =>
                    onNavigate("dashboard")
                }
            >
                <div className="brand-icon">
                    🧠
                </div>

                <div>
                    <h2>
                        Smart Food AI
                    </h2>

                    <span>
                        Spoilage Predictor
                    </span>
                </div>
            </div>


            <div className="navbar-links">

                {/* Dashboard */}

                <button
                    className={
                        currentPage === "dashboard"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        onNavigate("dashboard")
                    }
                >
                    Dashboard
                </button>


                {/* History */}

                <button
                    className={
                        currentPage === "history"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    onClick={() =>
                        onNavigate("history")
                    }
                >
                    History
                </button>


                {/* Logout */}

                <button
                    className="nav-link logout-link"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}


export default Navbar;