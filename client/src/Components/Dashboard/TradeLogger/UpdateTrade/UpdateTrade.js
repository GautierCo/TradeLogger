import React from "react";
import { Modal, Button, Icon, Input, Divider } from "semantic-ui-react";
import FormModal from "../FormTrade/FormTrade";

import "../AddTrade/addmodal.scss";

const UpdateTrade = ({
    showUpdateModal,
    setShowUpdateModal,
    tradeUpdateData,
    updateTrade,
    setTradeUpdateId,
    setTradeUpdateData,
    tradeId,
    tradeUpdateId,
    errors,
    deleteTrade,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTrade();
    };

    return (
        <Modal
            className="addmodal"
            style={{ backgroundColor: "#bbb" }}
            open={showUpdateModal && tradeId === tradeUpdateId}
            onClose={() => setShowUpdateModal(false)}
            onOpen={() => setShowUpdateModal(true)}
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
                {/* <div className="content-container">
                    <Image size="medium" src="https://www.tradingview.com/x/gFRYCH3B/" wrapped />
                    <div className="upload-screen">
                        <Input type="file" style={{ display: "none" }} />
                        <Button secondary>Upload screenshot</Button>
                        <Divider className="divider" horizontal inverted>
                            Or
                        </Divider>
                    </div>
                </div> */}
                <Modal.Description className="content-description">
                    <FormModal
                        tradeData={tradeUpdateData}
                        setTradeData={setTradeUpdateData}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className="addmodal-actions">
                <Button
                    type="submit"
                    onClick={(e) => {
                        setShowUpdateModal(false);
                        deleteTrade();
                    }}
                    color="red"
                >
                    Delete
                    <Icon name="chevron right" />
                </Button>
                <Button
                    type="submit"
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                    primary
                >
                    Save changes
                    <Icon name="chevron right" />
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default UpdateTrade;
