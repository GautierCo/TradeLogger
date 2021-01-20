import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Table, Image, Icon, Label, Form, Tab, Divider, Button } from "semantic-ui-react";
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
                        {trade.feeling && (
                            <Form.Field>
                                <label>Feeling :</label>
                                <Label>{trade.feeling}</Label>
                            </Form.Field>
                        )}
                        <Form.Field>
                            <label>Notes :</label>
                            <Form.TextArea
                                readOnly
                                value={trade.note}
                                className="note"
                                rows={10}
                                placeholder="Edit this trade for add note"
                            />
                        </Form.Field>
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

    const sortReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_SORT":
                if (state.column === action.column) {
                    return {
                        ...state,
                        data: state.data.slice().reverse(),
                        direction: state.direction === "ascending" ? "descending" : "ascending",
                    };
                }
                return {
                    column: action.column,
                    data: _.sortBy(state.data, [action.column]),
                    direction: "ascending",
                };

            case "SET_DATA":
                return {
                    column: null,
                    data: action.data,
                    direction: null,
                };
            case "SORT_RESET":
                return {
                    column: null,
                    data: action.data,
                    direction: null,
                };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = React.useReducer(sortReducer, {
        column: null,
        data: [],
        direction: null,
    });

    const { column, data, direction } = state;

    useEffect(() => {
        async function fetchData() {
            await fetchTrades();
        }
        fetchData();
    }, [fetchTrades]);

    useEffect(() => {
        dispatch({ type: "SET_DATA", data: trades });
    }, [trades]);

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
                    {column !== null && (
                        <Button
                            icon
                            labelPosition="left"
                            size="small"
                            onClick={() => dispatch({ type: "SORT_RESET", data: trades })}
                        >
                            <Icon name="undo" />
                            Sort reset
                        </Button>
                    )}
                    <AddTrade showModal={showAddTradeModal} setShowModal={setShowAddTradeModal} />
                </div>
                <Table basic="very" sortable celled inverted selectable textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === "status" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "status" })}
                            >
                                Status
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "assets" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "assets" })}
                            >
                                Assets
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "type" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "type" })}
                            >
                                Type
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "entryPrice" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "entryPrice" })}
                            >
                                Entry Price
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "stopLoss" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "stopLoss" })}
                            >
                                Stop Loss
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "takeProfit" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "takeProfit" })}
                            >
                                Take Profit
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "exitPrice" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "exitPrice" })}
                            >
                                Leaving Price
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "pnl" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "pnl" })}
                            >
                                PnL
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === "pnlPer" ? direction : null}
                                onClick={() => dispatch({ type: "CHANGE_SORT", column: "pnlPer" })}
                            >
                                PnL (%)
                            </Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {data && data !== [] && (
                        <Table.Body>
                            {data.map((trade) => (
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
                    )}
                </Table>
            </div>
        </Layout>
    );
};

export default TradeLogger;
