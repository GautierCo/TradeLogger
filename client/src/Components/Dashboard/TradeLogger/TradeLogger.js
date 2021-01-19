import React, { useEffect, useState } from "react";
import { Table, Image, Icon, Label, Form, Tab, Divider } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import "./tradelogger.scss";

/* Components */

import AddTrade from "../../../Containers/Dashboard/AddTrade.container";
import UpdateTrade from "../../../Containers/Dashboard/UpdateTrade.container";

/* Utils */
import {
    statusColor,
    formatTimestamps,
    formatDate,
    calculNbrOfTrades,
    calculTotalProfit,
    calculPerProfit,
    profitColor,
} from "../../../Utils/trade.utils";
import StatsContainerWithPer from "../Stats/StatsContainerWithPer";
import StatsContainer from "../Stats/StatsContainer";

const AllDataOfTrade = ({ trade, isAnimate }) => {
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
                                style={{
                                    display: "block",
                                    width: "auto",
                                    maxHeight: "25px",
                                    margin: "auto 0 auto auto",
                                }}
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

    return (
        <Layout title="Trade Logger">
            <div className="tradelogger">
                <div className="tradestats">
                    <StatsContainerWithPer
                        percentage={calculPerProfit(trades, "Long")}
                        nbrTrades={calculNbrOfTrades(trades, "Long")}
                        type={"Long"}
                    />
                    <StatsContainerWithPer
                        percentage={calculPerProfit(trades, "Short")}
                        nbrTrades={calculNbrOfTrades(trades, "Short")}
                        type={"Short"}
                    />
                    <StatsContainerWithPer
                        percentage={calculPerProfit(trades, "Global")}
                        nbrTrades={calculNbrOfTrades(trades, "Global")}
                        type={"Global"}
                    />
                    <StatsContainer totalProfit={calculTotalProfit(trades)} type={"Profit"} />
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
                                        <Table.Cell>
                                            {trade.format === "BTC" ? (
                                                <span style={{ color: profitColor(trade.pnl) }}>{trade.pnl} ₿</span>
                                            ) : (
                                                <span style={{ color: profitColor(trade.pnl) }}>{trade.pnl} $</span>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>{trade.pnlPer}%</Table.Cell>
                                        <Table.Cell style={{ display: "flex" }}>
                                            <UpdateTrade
                                                showModal={showUpdateTradeModal && trade._id === tradeUpdateId}
                                                setShowModal={setShowUpdateTradeModal}
                                                tradeId={trade._id}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    {selectedRow &&
                                        selectedRow._id === trade._id &&
                                        !showAddTradeModal &&
                                        !showUpdateTradeModal && (
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

export default TradeLogger;
