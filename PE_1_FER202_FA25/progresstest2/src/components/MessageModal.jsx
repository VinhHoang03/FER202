import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, message, onContinue }) => {
  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header className="border-0 pb-0 justify-content-center">
        <div style={{ fontSize: '3rem' }}>🎉</div>
      </Modal.Header>
      <Modal.Body className="text-center py-3">
        <p className="fs-5 mb-0 fw-semibold">{message}</p>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center pb-4">
        <Button
          variant="primary"
          onClick={onContinue}
          style={{ minWidth: '140px', borderRadius: '8px' }}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
