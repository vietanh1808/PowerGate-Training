import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPayrollItem } from '../../../../models/payroll';

interface Props {
  onHide: () => void;
  onSave: () => void;
  show: boolean;
  data: IPayrollItem;
}

const ModalDelete = (props: Props) => {
  const { onHide, show, onSave, data } = props;

  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Warning!!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you SURE to Remove invoice ID: {data.invoice} ?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={'primary'} onClick={onHide}>
          No
        </Button>
        <Button onClick={onSave}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
