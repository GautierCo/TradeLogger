import React from "react";
import { Modal, Button, Icon, Input, Divider } from "semantic-ui-react";
import FormModal from "../FormTrade/FormTrade";

import "./addmodal.scss";

const AddModal = ({ showModal, setShowModal, tradeData, addTrade, setTradeData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addTrade();
    };

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
                    <div className="upload-screen">
                        <Input type="file" style={{ display: "none" }} />
                        <Button secondary>Upload screenshot</Button>
                        <Divider className="divider" horizontal inverted>
                            Or
                        </Divider>
                        <Input label="URL" placeholder="https://www.tradingview.com/x/gFRYCH3B/" />
                    </div>
                </div>
                <Modal.Description className="content-description">
                    <FormModal tradeData={tradeData} setTradeData={setTradeData} handleSubmit={handleSubmit} />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className="addmodal-actions">
                <Button
                    type="submit"
                    onClick={(e) => {
                        handleSubmit(e);
                        setShowModal(false);
                    }}
                    primary
                >
                    Add trade <Icon name="chevron right" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddModal;
