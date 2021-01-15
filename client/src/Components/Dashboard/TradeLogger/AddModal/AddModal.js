import React, { useState } from "react";
import { Modal, Image, Button, Icon, Form, Input, Checkbox, Select, Divider } from "semantic-ui-react";
import "./addmodal.scss";

const typeSelect = [
    { key: "long", value: "long", text: "Long" },
    { key: "short", value: "short", text: "Short" },
];
const platformSelect = [
    { key: "binance", value: "binance", text: "Binance" },
    { key: "bittrex", value: "bittrex", text: "Bittrex" },
    { key: "kraken", value: "kraken", text: "Kraken" },
    { key: "coinbase", value: "coinbase", text: "Coinbase" },
];

const FormModal = ({ setupList }) => {
    const [leverageValue, setLeverageValue] = useState(1);

    const handleChangeLeverage = (e) => {
        setLeverageValue(e.target.value);
    };

    return (
        <div className="modalform">
            <Form>
                <Form.Group>
                    <Form.Field>
                        <label>Platform</label>
                        <Select placeholder="Binance" options={platformSelect} />
                    </Form.Field>
                    <Form.Field>
                        <label>Type</label>
                        <Select placeholder="Short, long" options={typeSelect} />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <label>Assets</label>
                        <Input placeholder="BTC/USDT" />
                    </Form.Field>

                    <Form.Field>
                        <label>Entry Price</label>
                        <Input placeholder="15.00" />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Stop Loss</label>
                        <Input placeholder="14.00" />
                    </Form.Field>

                    <Form.Field>
                        <label>Take Profit</label>
                        <Input placeholder="16.00" />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Capital</label>
                        <Input placeholder="2" />
                    </Form.Field>
                    <Form.Field>
                        <label>Risk Ratio</label>
                        <Input placeholder="2" />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                    <Form.Input
                        label={`Levier: x${leverageValue} `}
                        min={1}
                        max={125}
                        name="leverage"
                        step={1}
                        type="range"
                        onChange={handleChangeLeverage}
                        value={leverageValue}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Setup</label>
                    <Select placeholder="Ichimoku" options={setupList} />
                </Form.Field>

                <Form.Field>
                    <label>Entry Date</label>
                    <Input type="date" />
                </Form.Field>
            </Form>
        </div>
    );
};

const AddModal = ({ showModal, setShowModal, setupList }) => {
    return (
        <Modal
            className="addmodal"
            style={{ backgroundColor: "#bbb" }}
            open={showModal}
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
            trigger={
                <Button icon labelPosition="left" size="small" secondary>
                    <Icon name="add" />
                    Add trade
                </Button>
            }
        >
            <Modal.Header className="addmodal-header">Add a new Trade</Modal.Header>
            <Modal.Content image scrolling className="addmodal-content">
                <div className="content-container">
                    {/* <Image size="medium" src="https://www.tradingview.com/x/gFRYCH3B/" wrapped /> */}
                    <Input type="file" style={{ display: "none" }} />
                    <Button secondary>Upload screenshot</Button>
                    <Divider className="divider" horizontal inverted>
                        Or
                    </Divider>
                    <Input label="URL" placeholder="https://www.tradingview.com/x/gFRYCH3B/" />
                </div>
                <Modal.Description>
                    <FormModal setupList={setupList} />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className="addmodal-actions">
                <Button onClick={() => setShowModal(false)} primary>
                    {/* Submit here */}
                    Ajouter <Icon name="chevron right" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddModal;
