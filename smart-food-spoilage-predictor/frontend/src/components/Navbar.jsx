function Navbar({ currentPage, onNavigate }) {
    return (
        <nav className="navbar">

            <div
                className="navbar-brand"
                onClick={() => onNavigate("dashboard")}
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

            </div>

        </nav>
    );
}


export default Navbar;