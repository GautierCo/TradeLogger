import React, { useEffect } from "react";
import { Form, Input, Select, TextArea, Popup, Label } from "semantic-ui-react";

import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

const typeSelect = [
    { key: "long", value: "Long", text: "Long" },
    { key: "short", value: "Short", text: "Short" },
];
const platformSelect = [
    { key: "binance", value: "Binance", text: "Binance" },
    { key: "ftx", value: "FTX", text: "FTX" },
    { key: "bittrex", value: "Bittrex", text: "Bittrex" },
    { key: "kraken", value: "Kraken", text: "Kraken" },
    { key: "coinbase", value: "Coinbase", text: "Coinbase" },
];

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

const formatList = [
    {
        key: "USDT",
        text: "USDT",
        value: "USDT",
    },
    {
        key: "USD",
        text: "USD",
        value: "USD",
    },
    {
        key: "BTC",
        text: "BTC",
        value: "BTC",
    },
];

const errorLabelColor = "#fc4136";
const errorBorderColor = "1px solid rgb(252 65 54 / 64%)";

const FormModal = ({ tradeData, setTradeData, errors }) => {
    const handleChange = (e, data) => {
        const { name, value } = data ? data : e.target;
        const dataForm = {
            ...tradeData,
            [name]: value,
        };
        setTradeData(dataForm);
    };

    console.log("errorsformmodal", errors);

    return (
        <div className="modalform">
            <Form>
                <Form.Group>
                    <Form.Field>
                        <Popup
                            content="Calculations are different when you trade against BTC or USD"
                            trigger={<label>Format *</label>}
                        />
                        <Select
                            name="format"
                            placeholder="Choose.."
                            options={formatList}
                            value={tradeData.format}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    {tradeData.format === "BTC" && (
                        <Form.Field>
                            <Popup
                                content="The price of Bitcoin at the time you close your trade. So we can calculate your profit."
                                trigger={
                                    <label style={errors && errors.priceBtcVsUsd && { color: errorLabelColor }}>
                                        Price BTC vs USD
                                    </label>
                                }
                            />
                            <Input
                                style={errors && errors.priceBtcVsUsd && { border: errorBorderColor }}
                                name="priceBtcVsUsd"
                                type="text"
                                onChange={handleChange}
                                placeholder="35200"
                                label="$"
                                labelPosition={"right corner"}
                                value={tradeData.priceBtcVsUsd}
                            />
                        </Form.Field>
                    )}
                    <Form.Field>
                        <Popup
                            content="If you want, you can add screenshot for your trade. (URL)"
                            trigger={
                                <label style={errors && errors.screenshotUrl && { color: errorLabelColor }}>
                                    Screenshot URL
                                </label>
                            }
                        />

                        <Input
                            style={errors && errors.screenshotUrl && { border: errorBorderColor }}
                            name="screenshotUrl"
                            type="text"
                            onChange={handleChange}
                            placeholder="https://tradingview.com/x/gFRYCH3B/"
                            value={tradeData.screenshotUrl}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <label style={errors && errors.platform && { color: errorLabelColor }}>Platform *</label>
                        <Select
                            style={errors && errors.platform && { border: errorBorderColor }}
                            placeholder="Choose.."
                            name="platform"
                            options={platformSelect}
                            onChange={handleChange}
                            value={tradeData.platform}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={errors && errors.type && { color: errorLabelColor }}>Type *</label>
                        <Select
                            style={errors && errors.type && { border: errorBorderColor }}
                            placeholder="Choose.."
                            name="type"
                            options={typeSelect}
                            onChange={handleChange}
                            value={tradeData.type}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <Popup
                            content={
                                <>
                                    <p>If the format is USDT : Example : EGLD/USD ou BTC/USD.</p>
                                    <p>If the format is BTC : Example : EGLD/BTC</p>
                                </>
                            }
                            trigger={
                                <label style={errors && errors.assets && { color: errorLabelColor }}>Assets *</label>
                            }
                        />
                        <Input
                            style={errors && errors.assets && { border: errorBorderColor }}
                            name="assets"
                            placeholder={tradeData.format !== "BTC" ? `BTC/USDT` : `EGLD/BTC`}
                            value={tradeData.assets}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Popup
                            content="With what amount will you make this trade? If you are against the BTC, you must indicate an amount in Bitcoin."
                            trigger={
                                <label style={errors && errors.capital && { color: errorLabelColor }}>Capital *</label>
                            }
                        />
                        <Input
                            style={errors && errors.capital && { border: errorBorderColor }}
                            name="capital"
                            placeholder="1000"
                            type="text"
                            pattern="^\d*(\.\d{0,2})?$"
                            value={tradeData.capital}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label style={errors && errors.entryPrice && { color: errorLabelColor }}>Entry Price *</label>
                        <Input
                            style={errors && errors.entryPrice && { border: errorBorderColor }}
                            name="entryPrice"
                            placeholder="34589"
                            value={tradeData.entryPrice}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={errors && errors.stopLoss && { color: errorLabelColor }}>Stop Loss</label>
                        <Input
                            style={errors && errors.stopLoss && { border: errorBorderColor }}
                            name="stopLoss"
                            placeholder="33187"
                            value={tradeData.stopLoss}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <label style={errors && errors.takeProfit && { color: errorLabelColor }}>Take Profit</label>
                        <Input
                            style={errors && errors.takeProfit && { border: errorBorderColor }}
                            name="takeProfit"
                            placeholder="36897"
                            value={tradeData.takeProfit}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Popup
                            content="You can leave this box blank while waiting for your trade to be closed."
                            trigger={
                                <label style={errors && errors.exitPrice && { color: errorLabelColor }}>
                                    Leaving Price
                                </label>
                            }
                        />
                        <Input
                            style={errors && errors.exitPrice && { border: errorBorderColor }}
                            name="exitPrice"
                            placeholder="36897"
                            value={tradeData.exitPrice}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label style={errors && errors.riskRatio && { color: errorLabelColor }}>Risk Ratio</label>
                        <Input
                            style={errors && errors.riskRatio && { border: errorBorderColor }}
                            name="riskRatio"
                            placeholder="2"
                            value={tradeData.riskRatio}
                            onChange={handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Setup</label>
                        <Select
                            name="setup"
                            placeholder="Choose.."
                            options={setupList}
                            value={tradeData.setup}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>{`Levier: x${tradeData.leverage} `}</label>
                        <Input
                            min={1}
                            max={125}
                            name="leverage"
                            step={1}
                            type="range"
                            onChange={handleChange}
                            value={tradeData.leverage}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Popup
                            content="Your fee percentage (%). If you have 1% fee, write only 1."
                            trigger={<label style={errors && errors.fees && { color: errorLabelColor }}>Fees *</label>}
                        />
                        <Input
                            style={errors && errors.fees && { border: errorBorderColor }}
                            name="fees"
                            placeholder="1"
                            value={tradeData.fees}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label style={errors && errors.entryDate && { color: errorLabelColor }}>Entry Date</label>
                        <DatePicker
                            style={errors && errors.entryDate && { border: errorBorderColor }}
                            name="entryDate"
                            selected={Date.parse(tradeData.entryDate)}
                            onChange={(date) => {
                                console.log(date);
                                setTradeData({
                                    ...tradeData,
                                    entryDate: date,
                                });
                            }}
                            showTimeSelect
                            locale="fr"
                            timeFormat="p"
                            timeIntervals={5}
                            dateFormat="Pp"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={errors && errors.exitDate && { color: errorLabelColor }}>Exit Date</label>
                        <DatePicker
                            style={errors && errors.exitDate && { border: errorBorderColor }}
                            name="exitDate"
                            selected={Date.parse(tradeData.exitDate)}
                            onChange={(date) => {
                                setTradeData({
                                    ...tradeData,
                                    exitDate: date,
                                });
                            }}
                            showTimeSelect
                            locale="fr"
                            timeFormat="p"
                            timeIntervals={5}
                            dateFormat="Pp"
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Field>
                    <label style={errors && errors.feeling && { color: errorLabelColor }}>Feeling</label>
                    <Input
                        style={errors && errors.feeling && { border: errorBorderColor }}
                        name="feeling"
                        onChange={handleChange}
                        value={tradeData.feeling}
                        placeholder="Feeling about this trade"
                    />
                </Form.Field>

                <Form.Field>
                    <label style={errors && errors.notes && { color: errorLabelColor }}>Notes :</label>
                    <TextArea
                        style={errors && errors.notes && { border: errorBorderColor }}
                        name="note"
                        value={tradeData.note}
                        onChange={handleChange}
                        className="note"
                        rows={2}
                        rows={10}
                        placeholder="What is your state of mind? Are you confident about taking this trade? Is this trade in accordance with your trading plan?"
                    />
                </Form.Field>
            </Form>
        </div>
    );
};

export default FormModal;
