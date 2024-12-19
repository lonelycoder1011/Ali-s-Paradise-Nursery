import React from "react";
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
    const plantTotalCost = totalCosts.plant;

    return (
        <div className="pricing-app">
            <div className="display_box">
                <div className="header">
                    <p className="preheading">
                        <h3>Total Cost for the Plants</h3>
                    </p>
                </div>
                <div>
                    <h2 id="pre_fee_cost_display" className="price">
                        ${plantTotalCost}
                    </h2>
                    <div className="render_items">
                        <ItemsDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCost;
