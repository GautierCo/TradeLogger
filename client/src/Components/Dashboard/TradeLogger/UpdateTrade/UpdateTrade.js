import React, { useState } from "react";
import { Modal, Image, Button, Icon, Form, Input, Select, Divider } from "semantic-ui-react";
import FormModal from "../FormTrade/FormTrade";

import "../AddTrade/addmodal.scss";

const UpdateTrade = ({
    showModal,
    setShowModal,
    tradeUpdateData,
    updateTrade,
    setTradeUpdateId,
    setTradeUpdateData,
    tradeId,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTrade();
    };

    return (
        <Modal
            className="addmodal"
            style={{ backgroundColor: "#bbb" }}
            open={showModal}
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
            trigger={
                <Icon
                    name="edit"
                    style={{ display: "block", margin: "auto" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setTradeUpdateId(tradeId);
                    }}
                />
            }
        >
            <Modal.Header className="addmodal-header">Update Trade</Modal.Header>
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
                <Modal.Description className="content-description">
                    <FormModal
                        tradeData={tradeUpdateData}
                        setTradeData={setTradeUpdateData}
                        handleSubmit={handleSubmit}
                    />
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
                    Ajouter <Icon name="chevron right" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default UpdateTrade;