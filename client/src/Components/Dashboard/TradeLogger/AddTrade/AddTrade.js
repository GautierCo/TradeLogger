import React from "react";
import { Modal, Button, Icon, Input, Divider } from "semantic-ui-react";
import FormModal from "../FormTrade/FormTrade";

import "./addmodal.scss";

const AddModal = ({ tradeData, addTrade, setTradeData, errors, showAddModal, setShowAddModal }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTrade();
    };

    return (
        <Modal
            className="addmodal"
            style={{ backgroundColor: "#bbb" }}
            open={showAddModal}
            onClose={() => setShowAddModal(false)}
            onOpen={() => setShowAddModal(true)}
            trigger={
                <Button icon labelPosition="left" size="small" primary>
                    <Icon name="add" />
                    Add trade
                </Button>
            }
        >
            <Modal.Header className="addmodal-header">Add a new Trade</Modal.Header>
            <Modal.Content image scrolling className="addmodal-content">
                {/* <div className="content-container">
                   <Image size="medium" src="https://www.tradingview.com/x/gFRYCH3B/" wrapped /> 
                    <div className="upload-screen">
                        <Input type="file" style={{ display: "none" }} />
                        <Button secondary>Upload screenshot</Button>
                        <Divider className="divider" horizontal inverted>
                            Or
                        </Divider>
                        <Input label="URL" placeholder="https://www.tradingview.com/x/gFRYCH3B/" />
                    </div>
                </div> */}
                <Modal.Description className="content-description">
                    <FormModal
                        tradeData={tradeData}
                        setTradeData={setTradeData}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className="addmodal-actions">
                <Button
                    type="submit"
                    onClick={(e) => {
                        handleSubmit(e);
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
