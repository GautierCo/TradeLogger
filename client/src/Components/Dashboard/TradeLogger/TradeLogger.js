import React, { useState } from "react";
import { Dropdown, Table, Image, Icon, Label, TextArea, Form, List, Button, Tab, Divider } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import "./tradelogger.scss";

import ReactSlider from "react-slider";

/* fake data */
import FakeData from "../../../FakeData/tradeLogger.json";
import AddModal from "./AddModal/AddModal";

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
                            <div className="session-entrydate">{trade.entryDate}</div>
                            <Icon name="long arrow alternate right" style={{ display: "block", width: "10%" }} />
                            <div className="session-exitdate">{trade.exitDate}</div>
                        </div>
                        <div className="duration-container">
                            <Icon name="time" />
                            {trade.sessionDuration}
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
                        <div className="">1100 $</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Leverage</label>
                        <div className="">x 125</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Setup</label>
                        <div className="">Ichimoku</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Risk</label>
                        <div className="">2.0</div>
                    </div>
                    <div className="">
                        <label className="trade-label">Fees</label>
                        <div className="">1%</div>
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
                        <label>Notes :</label>
                        <Form.TextArea
                            className="note"
                            rows={2}
                            rows={10}
                            placeholder="Dans quel état d'esprit êtes-vous ? Est-ce que vous êtes confiant à l'idée de prendre ce trade ? Ce trade respect-il votre trading plan?"
                        />
                    </Form.Field>
                    <Button size="mini">Sauvegarder</Button>
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

const TradeLogger = () => {
    const [selectedRow, setSelectedRow] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleShowTrade = (trade) => {
        if (selectedRow.id === trade.id) {
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
                        {FakeData.data.map((trade) => (
                            <>
                                <Table.Row
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleShowTrade(trade)}
                                    key={trade.id}
                                    active={selectedRow && selectedRow.id === trade.id}
                                >
                                    <Table.Cell>{trade.status}</Table.Cell>
                                    <Table.Cell>{trade.assets}</Table.Cell>
                                    <Table.Cell>{trade.type}</Table.Cell>
                                    <Table.Cell>{trade.entryPrice}</Table.Cell>
                                    <Table.Cell>{trade.stopLoss}</Table.Cell>
                                    <Table.Cell>{trade.takeProfit}</Table.Cell>
                                    <Table.Cell>{trade.leavingProfit}</Table.Cell>
                                    <Table.Cell>{trade.pnl}$</Table.Cell>
                                    <Table.Cell>{trade.pnl_per}%</Table.Cell>
                                </Table.Row>
                                {selectedRow && selectedRow.id === trade.id && (
                                    <Table.Row textAlign="left">
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
