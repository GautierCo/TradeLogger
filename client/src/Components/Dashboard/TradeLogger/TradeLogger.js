import React, { useEffect, useState } from "react";
import { Table, Image, Icon, Label, Form, Button, Tab, Divider } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import moment from "moment";
import duration from "moment-duration-format";
import "./tradelogger.scss";

/* Components */
import AddModal from "./AddModal/AddModal";

const formatTimestamps = (timestamps) => {
    const seconds = timestamps;
    const durationInSeconds = moment.duration(seconds, "seconds");
    const sessionDuration = durationInSeconds.format(duration, "dd:hh:mm:ss");
    return sessionDuration;
};

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY HH:mm");
};

const setupList = [
    {
        key: "Ichimoku",
        text: "Ichimoku",
        value: "Ichimoku",
    },
    {
        key: "W",
        text: "W",
        value: "W",
    },
];

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
                        <Image src={trade.platformLogo} size="big" style={{ display: "block", width: "100%" }} />
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
        render: () => (
            <Tab.Pane>
                <Form>
                    <Form.Field>
                        <label>Feeling :</label>
                        <Label>Good</Label>
                    </Form.Field>
                    <Form.Field>
                        <label>Notes :</label>
                        <Form.TextArea
                            className="note"
                            rows={2}
                            rows={10}
                            placeholder="Dans quel état d'esprit êtes-vous ? Est-ce que vous êtes confiant à l'idée de prendre ce trade ? Ce trade respect-il votre trading plan?"
                        />
                    </Form.Field>
                    <Button size="mini" primary>
                        Sauvegarder
                    </Button>
                </Form>
            </Tab.Pane>
        ),
    },
];

const AllDataOfTrade = ({ trade, isAnimate }) => {
    return (
        <div className={`trade ${isAnimate ? "animate-trade" : "animate-exit-trade"}`}>
            <Tab trade={trade} menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} className="tab" />
        </div>
    );
};

const TradeLogger = (props) => {
    const { trades, fetchTrades } = props;
    const [selectedRow, setSelectedRow] = useState({});
    const [showModal, setShowModal] = useState(false);

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
                <div className="action">
                    <AddModal showModal={showModal} setShowModal={setShowModal} setupList={setupList} />
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
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {trades.map((trade) => (
                            <>
                                <Table.Row
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleShowTrade(trade)}
                                    key={"s12f5za1ef"}
                                    active={selectedRow && selectedRow._id === trade._id}
                                >
                                    <Table.Cell>{trade.status}</Table.Cell>
                                    <Table.Cell>{trade.assets}</Table.Cell>
                                    <Table.Cell>{trade.type}</Table.Cell>
                                    <Table.Cell>{trade.entryPrice}</Table.Cell>
                                    <Table.Cell>{trade.stopLoss}</Table.Cell>
                                    <Table.Cell>{trade.takeProfit}</Table.Cell>
                                    <Table.Cell>{trade.exitPrice}</Table.Cell>
                                    <Table.Cell>{trade.pnl}$</Table.Cell>
                                    <Table.Cell>{trade.pnlPer}%</Table.Cell>
                                </Table.Row>
                                {selectedRow && selectedRow._id === trade._id && (
                                    <Table.Row textAlign="left" key={trade._id}>
                                        <Table.Cell colSpan={9}>
                                            <AllDataOfTrade isAnimate={true} trade={trade} />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </Layout>
    );
};

export default TradeLogger;
