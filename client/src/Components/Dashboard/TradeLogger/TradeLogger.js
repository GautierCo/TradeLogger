import React, { useState } from "react";
import { Checkbox, Table, Image, Icon, Label, TextArea, Form, List } from "semantic-ui-react";
import Layout from "../Layout";
import "./tradelogger.scss";

import ReactSlider from "react-slider";

/* fake data */
import FakeData from "../../../FakeData/tradeLogger.json";

/*

            {trade.entryDate}
            {trade.exitDate}
            {trade.sessionDuration}
            {trade.platform}
            {trade.leverage}
            {trade.setup}
            {trade.note}
            {trade.feeling}
            {trade.capital}

*/

const SliderComp = ({ leverage }) => {
    return (
        <div className="react-slider">
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
        </div>
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
                        <List.Item>
                            <Label color="blue" horizontal size="medium">
                                Capital
                            </Label>
                            {trade.capital}$
                        </List.Item>
                        <List.Item>
                            <Label color="red" horizontal size="medium">
                                Levier
                            </Label>
                        </List.Item>
                        <List.Item>
                            <Label color="orange" horizontal size="medium">
                                Setup
                            </Label>
                            {trade.setup}
                        </List.Item>
                    </List>

                    <div className="">
                        Note:
                        <Form>
                            <TextArea
                                className="note"
                                rows={2}
                                placeholder="Dans quel état d'esprit êtes-vous ? Est-ce que vous êtes confiant à l'idée de prendre ce trade ? Ce trade respect-il votre trading plan?"
                            />
                        </Form>
                        <SliderComp leverage={trade.leverage} />
                    </div>
                </div>
            </div>
            <div className="trade-setup">
                <Image src={trade.screenshotUrl} className="trade-screenshot" size="large" />
            </div>
        </div>
    );
};

const TradeLogger = () => {
    const [selectedRow, setSelectedRow] = useState({});

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
