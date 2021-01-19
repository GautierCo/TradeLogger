import React from "react";
import { Label } from "semantic-ui-react";
import { profitColor, formatNumber } from "../../../Utils/trade.utils";
import "./stats.scss";

const StatsContainer = ({ totalProfit, type }) => {
    return (
        <div className="tradestats-profit_container">
            <Label style={{ display: "block", textTransform: "uppercase" }} color={"blue"}>
                {type}
            </Label>
            <div className="tradestats-totalprofit">
                <span style={{ color: profitColor(totalProfit) }}>{totalProfit && formatNumber(totalProfit)} $</span>
            </div>
        </div>
    );
};

export default StatsContainer;
