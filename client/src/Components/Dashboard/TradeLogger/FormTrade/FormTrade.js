import React from "react";
import { Form, Input, Select, TextArea } from "semantic-ui-react";
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

const FormModal = ({ tradeData, setTradeData, handleSubmit }) => {
    const handleChange = (e, data) => {
        const { name, value } = data ? data : e.target;
        const dataForm = {
            ...tradeData,
            [name]: value,
        };
        setTradeData(dataForm);
    };

    return (
        <div className="modalform">
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Screenshot</label>
                    <Input
                        name="screenshotUrl"
                        onChange={handleChange}
                        label="URL"
                        placeholder="https://www.tradingview.com/x/gFRYCH3B/"
                        value={tradeData.screenshotUrl}
                    />
                </Form.Field>
                <Form.Group>
                    <Form.Field>
                        <label>Platform</label>
                        <Select
                            placeholder="Choose.."
                            name="platform"
                            options={platformSelect}
                            onChange={handleChange}
                            value={tradeData.platform}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Type</label>
                        <Select
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
                        <label>Assets</label>
                        <Input name="assets" placeholder="BTC/USDT" value={tradeData.assets} onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Capital</label>
                        <Input
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
                        <label>Entry Price</label>
                        <Input
                            name="entryPrice"
                            placeholder="34589"
                            value={tradeData.entryPrice}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Stop Loss</label>
                        <Input name="stopLoss" placeholder="33187" value={tradeData.stopLoss} onChange={handleChange} />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <label>Take Profit</label>
                        <Input
                            name="takeProfit"
                            placeholder="36897"
                            value={tradeData.takeProfit}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Leaving Price</label>
                        <Input
                            name="exitPrice"
                            placeholder="36897"
                            value={tradeData.exitPrice}
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Risk Ratio</label>
                        <Input name="riskRatio" placeholder="2" value={tradeData.riskRatio} onChange={handleChange} />
                    </Form.Field>

                    <Form.Field>
                        <label>Setup</label>
                        <Select
                            name="setup"
                            placeholder="Ichimoku"
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
                        <label>Fees</label>
                        <Input name="fees" placeholder="1" value={tradeData.fees} onChange={handleChange} />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Entry Date</label>
                        <DatePicker
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
                        <label>Exit Date</label>
                        <DatePicker
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
                    <label>Notes :</label>
                    <TextArea
                        name="note"
                        value={tradeData.note}
                        onChange={handleChange}
                        className="note"
                        rows={2}
                        rows={10}
                        placeholder="Dans quel état d'esprit êtes-vous ? Est-ce que vous êtes confiant à l'idée de prendre ce trade ? Ce trade respect-il votre trading plan?"
                    />
                </Form.Field>
            </Form>
        </div>
    );
};

export default FormModal;
