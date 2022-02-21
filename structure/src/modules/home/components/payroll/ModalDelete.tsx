import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  onHide: () => void;
  onSave: () => void;
  show: boolean;
}

const ModalDelete = (props: Props) => {
  const { onHide, show, onSave } = props;

  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={'primary'} onClick={onHide}>
          Close
        </Button>
        <Button onClick={onSave}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
