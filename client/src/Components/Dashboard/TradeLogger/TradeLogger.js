import React, { useEffect, useState } from "react";
import { Table, Image, Icon, Label, Form, Button, Tab, Divider } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import "./tradelogger.scss";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/* Components */

import AddTrade from "../../../Containers/Dashboard/AddTrade.container";
import UpdateTrade from "../../../Containers/Dashboard/UpdateTrade.container";

/* Utils */
import { statusColor, formatTimestamps, formatDate } from "../../../Utils/trade.utils";

const panes = [
    {
        menuItem: "Infos",
        render: ({ trade }) => (
            <Tab.Pane>
                <div className="trade-infos_session">
                    <div className="session-left">
                        <div className="session-container">
                            <div className="session-entrydate">{formatDate(trade.entryDate)}</div>
                            <Icon name="long arrow alternate right" style={{ display: "block", width: "10%" }} />
                            <div className="session-exitdate">{formatDate(trade.exitDate)}</div>
                        </div>
                        <div className="duration-container">
                            <Icon name="time" />
                            {formatTimestamps(trade.sessionDuration)}
                        </div>
                    </div>
                    <div className="session-right">
                        <Image
                            src={`./platform/${trade.platform}.png`}
                            size="big"
                            style={{ display: "block", width: "auto", maxHeight: "25px", margin: "auto 0 auto auto" }}
                        />
                    </div>
                </div>
                <Divider />
                <div className="trade-infos_data">
                    <div className="">
                        <label className="trade-label">Capital</label>
                        <div className="">{trade.capital} $</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Leverage</label>
                        <div className="">x {trade.leverage}</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Setup</label>
                        <div className="">{trade.setup}</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Risk</label>
                        <div className="">{trade.riskRatio}</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Fees</label>
                        <div className="">{trade.fees}%</div>
                    </div>
                </div>
            </Tab.Pane>
        ),
    },
    {
        menuItem: "Screenshot",
        render: ({ trade }) => (
            <Tab.Pane>
                <label className="trade-label">Screen :</label>
                <Image src={trade.screenshotUrl} className="trade-screenshot" size="large" />
            </Tab.Pane>
        ),
    },
    {
        menuItem: "Notes",
        render: ({ trade }) => (
            <Tab.Pane>
                <Form>
                    <Form.Field>
                        <label>Feeling :</label>
                        <Label>Good</Label>
                    </Form.Field>
                    <Form.Field>
                        <label>Notes :</label>
                        <Form.TextArea
                            readOnly
                            value={trade.note}
                            className="note"
                            rows={2}
                            rows={10}
                            placeholder="Edit this trade for add note"
                        />
                    </Form.Field>
                    {/* <Button size="mini" primary>
                        Sauvegarder
                    </Button> */}
                </Form>
            </Tab.Pane>
        ),
    },
];

const StatsContainer = ({ percentage, nbrTrades, totalProfit, title, type }) => {
    return (
        <>
            {totalProfit ? (
                <div className="tradestats-profit_container">
                    <Label style={{ display: "block", textTransform: "uppercase" }} color={"blue"}>
                        {type}
                    </Label>
                    <div className="tradestats-totalprofit">{totalProfit && totalProfit + "$"}</div>
                </div>
            ) : (
                <div className="tradestats_container">
                    <div className="tradestats-left">
                        {nbrTrades && (
                            <Label
                                style={{ display: "block", textTransform: "uppercase" }}
                                color={
                                    (type === "Long" && "green") ||
                                    (type === "Short" && "red") ||
                                    (type === "Profit" && "orange")
                                }
                            >
                                {type}
                            </Label>
                        )}
                        {/* <h3 className="tradestats-title">TOTAL</h3> */}
                        <div className="tradestats-number">{nbrTrades && nbrTrades}</div>
                    </div>
                    {nbrTrades && (
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
            )}
        </>
    );
};

const AllDataOfTrade = ({ trade, isAnimate }) => {
    return (
        <div className={`trade ${isAnimate ? "animate-trade" : "animate-exit-trade"}`}>
            <Tab trade={trade} menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} className="tab" />
        </div>
    );
};

const TradeLogger = (props) => {
    const { trades, fetchTrades, tradeUpdateId } = props;
    const [selectedRow, setSelectedRow] = useState({});
    const [showAddTradeModal, setShowAddTradeModal] = useState(false);
    const [showUpdateTradeModal, setShowUpdateTradeModal] = useState(false);

    useEffect(() => {
        fetchTrades();
    }, []);

    const handleShowTrade = (trade) => {
        if (selectedRow._id === trade._id) {
            setSelectedRow({});
        } else {
            setSelectedRow(trade);
        }
    };

    const percentage = 55;
    const nbrTrades = 3;

    return (
        <Layout title="Trade Logger">
            <div className="tradelogger">
                <div className="tradestats">
                    <StatsContainer percentage={percentage} nbrTrades={nbrTrades} title={"LONG TRADE"} type={"Long"} />
                    <StatsContainer
                        percentage={percentage}
                        nbrTrades={nbrTrades}
                        title={"SHORT TRADE"}
                        type={"Short"}
                    />
                    <StatsContainer percentage={60} nbrTrades={50} title={"Win rate"} type={"Global"} />
                    <StatsContainer percentage={60} totalProfit={5580} title={"Win rate"} type={"Profit"} />
                </div>
                <div className="action">
                    <AddTrade showModal={showAddTradeModal} setShowModal={setShowAddTradeModal} />
                </div>
                <Table basic="very" celled inverted selectable textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Assets</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Entry Price</Table.HeaderCell>
                            <Table.HeaderCell>Stop Loss</Table.HeaderCell>
                            <Table.HeaderCell>Take Profit</Table.HeaderCell>
                            <Table.HeaderCell>Leaving Price</Table.HeaderCell>
                            <Table.HeaderCell>PnL ($)</Table.HeaderCell>
                            <Table.HeaderCell>PnL (%)</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {trades &&
                            trades.map((trade) => (
                                <React.Fragment key={trade._id}>
                                    <Table.Row
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleShowTrade(trade)}
                                        active={selectedRow && selectedRow._id === trade._id}
                                    >
                                        <Table.Cell style={{ color: statusColor(trade.status) }}>
                                            {trade.status}
                                        </Table.Cell>
                                        <Table.Cell>{trade.assets}</Table.Cell>
                                        <Table.Cell>{trade.type}</Table.Cell>
                                        <Table.Cell>{trade.entryPrice}</Table.Cell>
                                        <Table.Cell>{trade.stopLoss}</Table.Cell>
                                        <Table.Cell>{trade.takeProfit}</Table.Cell>
                                        <Table.Cell>{trade.exitPrice}</Table.Cell>
                                        <Table.Cell>{trade.pnl}$</Table.Cell>
                                        <Table.Cell>{trade.pnlPer}%</Table.Cell>
                                        <Table.Cell style={{ display: "flex" }}>
                                            <UpdateTrade
                                                showModal={showUpdateTradeModal && trade._id === tradeUpdateId}
                                                setShowModal={setShowUpdateTradeModal}
                                                tradeId={trade._id}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    {selectedRow && selectedRow._id === trade._id && (
                                        <Table.Row textAlign="left">
                                            <Table.Cell colSpan={10}>
                                                <AllDataOfTrade isAnimate={true} trade={trade} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </React.Fragment>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </Layout>
    );
};

/*

Un bouton qui switch entre $ et %

Nombre de trade Long  + Win rate || gain
Nombre de trade Short + Win rate || gain

Profit Global 
Win rates Global

*/

export default TradeLogger;
