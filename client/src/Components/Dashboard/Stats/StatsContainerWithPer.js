import React from "react";
import { Label } from "semantic-ui-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./stats.scss";

const StatsContainerWithPer = ({ percentage, nbrTrades, type }) => {
    return (
        <>
            <div className="tradestats_container">
                <div className="tradestats-left">
                    {nbrTrades !== "undefined" && (
                        <Label
                            style={{ display: "block", textTransform: "uppercase" }}
                            color={
                                (type === "Long" && "green") ||
                                (type === "Short" && "red") ||
                                (type === "Global" && "grey")
                            }
                        >
                            {type}
                        </Label>
                    )}
                    {/* <h3 className="tradestats-title">TOTAL</h3> */}
                    <div className="tradestats-number">{nbrTrades && nbrTrades}</div>
                </div>
                {nbrTrades !== "undefined" && (
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={{
                            // Customize the root svg element
                            root: { width: "45%" },
                            // Customize the path, i.e. the "completed progress"
                            path: {
                                // Path color
                                stroke: "#21ba45",
                                //stroke: `rgba(255, 255, 255, ${percentage / 100})`,
                                //stroke: `rgba(255, 255, 255)`,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",
                                // Customize transition animation
                                transition: "stroke-dashoffset 0.5s ease 0s",
                                // Rotate the path
                                transform: "rotate(0turn)",
                                transformOrigin: "center center",
                            },
                            // Customize the circle behind the path, i.e. the "total progress"
                            trail: {
                                // Trail color
                                stroke: `rgb(187 187 187)`,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",
                                // Rotate the trail
                                transform: "rotate(0.25turn)",
                                transformOrigin: "center center",
                            },
                            // Customize the text
                            text: {
                                fill: "#21ba45",
                                fontSize: "18px",
                                fontWeight: "bold",
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                                fill: "#3e98c7",
                            },
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default StatsContainerWithPer;
