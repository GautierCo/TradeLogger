import React, { useState } from "react";
import { Dropdown, Table, Image, Icon, Label, TextArea, Form, List, Button } from "semantic-ui-react";
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

const SliderComp = ({ leverage }) => {
    return (
        <ReactSlider
            defaultValue={leverage}
            className="horizontal-slider slider"
            marks={[1, 25, 50, 75, 100, 125]}
            min={1}
            max={125}
            withTracks
            markClassName="slider__mark slider__active"
            thumbClassName="slider__thumb"
            trackClassName="slider__track"
            renderThumb={(props, state) => {
                return (
                    <div className="slider__thumb" {...props}>
                        {state.valueNow}x
                    </div>
                );
            }}
            renderTrack={(props, state) => {
                return (
                    <div className="slider__track" {...props}>
                        {props.value}
                    </div>
                );
            }}
            renderMark={(props) => {
                return <div {...props}>{props.key}</div>;
            }}
        />
    );
};

const AllDataOfTrade = ({ trade }) => {
    return (
        <div className="trade">
            <div className="trade-infos">
                <div className="trade-infos_session">
                    <div className="session-right">
                        <Image src={trade.platformLogo} size="big" style={{ display: "block", width: "100%" }} />
                    </div>
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
                </div>
                <div className="trade-infos_details">
                    <List divided relaxed>
                        <List.Item className="trade-infos__item" style={{ display: "flex" }}>
                            <div className="" style={{ marginRight: "2em", display: "flex", alignItems: "center" }}>
                                <Label color="blue" horizontal size="large">
                                    Capital
                                </Label>
                                <div className="capital">{trade.capital}$</div>
                            </div>
                            <div className="" style={{ marginRight: "2em", display: "flex", alignItems: "center" }}>
                                <Label color="red" horizontal size="large">
                                    Risk Ratio
                                </Label>
                                <div className="risk">{trade.riskRatio}</div>
                            </div>
                        </List.Item>

                        <List.Item className="trade-infos__item" style={{ display: "flex" }}>
                            <Label color="violet" horizontal size="large">
                                Levier
                            </Label>
                            <SliderComp leverage={trade.leverage} />
                        </List.Item>

                        <List.Item className="trade-infos__item">
                            <Label color="green" horizontal size="large">
                                Setup
                            </Label>
                            <Dropdown
                                style={{ fontSize: ".7em" }}
                                placeholder="Select Setup"
                                defaultValue={trade.setup}
                                size=""
                                scrolling
                                selection
                                options={setupList}
                            />
                        </List.Item>
                    </List>

                    <div className="">
                        Note:
                        <Form>
                            <TextArea
                                className="note"
                                rows={2}
                                rows={10}
                                placeholder="Dans quel état d'esprit êtes-vous ? Est-ce que vous êtes confiant à l'idée de prendre ce trade ? Ce trade respect-il votre trading plan?"
                            />
                        </Form>
                    </div>
                </div>
            </div>
            <div className="trade-setup">
                <div className="trade-edit">
                    <Icon name="edit" style={{ cursor: "pointer" }} />
                </div>
                <Image src={trade.screenshotUrl} className="trade-screenshot" size="large" />
            </div>
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
                                            <AllDataOfTrade trade={trade} />
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
