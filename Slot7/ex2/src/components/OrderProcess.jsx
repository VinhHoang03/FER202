import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function OrderProcess() {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleConfirm = () => {
    alert("✔️ Đơn hàng đã được duyệt và chuyển sang bộ phận kho!");
    setIsShowModal(false);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 60px)", // trừ chiều cao NavBar
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h4>📦 Order Management</h4>

        <Button
          variant="primary"
          onClick={() => setIsShowModal(true)}
        >
          Xử lý đơn hàng
        </Button>
      </div>

      <Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xử lý</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho
          không?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowModal(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderProcess;
