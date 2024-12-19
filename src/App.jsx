import React, { useState } from "react";
import "./App.css";
import ParadiseNursery from "./ParadiseNursery";
import AboutUs from "./AboutUs";

function App() {
    const [showPlant, setShowPlant] = useState(false);

    const handleGetStarted = () => {
        
        const venue = document.getElementById('venue');
        
        venue.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <>
            <header className="first_page">
                <div className="main_event">
                    <div className="first_page_name_btn">
                        <h1 className="nursery_shopping">Ali's Paradise Nursery</h1>
                        <p className="allojo_sentence">Shop the Best Plants with good benefits from our Nursery</p>
                        <div className="get_started_btn">
                            <button onClick={() => handleGetStarted()} className="get-started-btn">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="aboutus_main">
                        <AboutUs />
                    </div>
                </div>
            </header>

            <div className={`event-list-container ${showPlant ? 'visible' : ''}`}>
                <ParadiseNursery />
            </div>
        </>
    )
}

export default App;