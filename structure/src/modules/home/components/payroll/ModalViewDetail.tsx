import { toArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IPayrollItem, IUpdatePayroll } from '../../../../models/payroll';
import { AppState } from '../../../../redux/reducer';

interface Props {
  onHide: () => void;
  onSave: (data: IUpdatePayroll) => void;
  show: boolean;
  data: IUpdatePayroll;
}

const ModalViewDetail = (props: Props) => {
  const payrolls = useSelector((state: AppState) => state.payrolls.payroll);
  const { onHide, show, onSave, data } = props;
  const [listCurrency, setListCurrency] = useState<string[]>([]);
  const [formValue, setFormValue] = useState<IUpdatePayroll>({
    status: '',
    date: '',
    client: '',
    currency: '',
    total: 0,
    invoice: '',
    fees: 0,
    volume_input_in_input_currency: 0,
  });

  useEffect(() => {
    const currencys = payrolls.map((payroll, index) => {
      return payroll.currency;
    });
    setListCurrency(Array.from(new Set(currencys)));
    setFormValue(data);
  }, []);

  const handleSave = () => {
    const equalValue = JSON.stringify(data) === JSON.stringify(formValue);
    if (!equalValue) {
      onSave(formValue);
    }
    onHide();
  };

  const handleChangeElement = (e: any) => {
    switch (e.target.id) {
      case 'Date':
        setFormValue({ ...formValue, date: e.target.value });
        break;
      case 'Currency':
        setFormValue({ ...formValue, currency: e.target.value });
        break;
      case 'Fees':
        setFormValue({ ...formValue, fees: +e.target.value });
        break;
      case 'Volume':
        setFormValue({ ...formValue, volume_input_in_input_currency: +e.target.value });
        break;

      default:
        break;
    }
  };

  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>ID: {data.invoice}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div>Date </div>
          <input id="Date" type={'date'} value={formValue.date.slice(0, 10)} onChange={handleChangeElement} />
        </div>
        <div>
          <div>
            Total <span>{data.total}</span>{' '}
          </div>
          <div className="d-flex flex-row justify-content-around">
            <div>
              <span>Fees: </span>
              <input
                id="Fees"
                type={'number'}
                defaultValue={data.fees}
                onChange={handleChangeElement}
                value={formValue.fees}
              />
            </div>
            <div>
              <span>Volume: </span>
              <input
                id="Volume"
                type={'number'}
                defaultValue={data.volume_input_in_input_currency}
                onChange={handleChangeElement}
                value={formValue.volume_input_in_input_currency}
              />
            </div>
          </div>
        </div>
        <div>
          <div>Currency </div>
          <select id="Currency" defaultValue={data.currency} onChange={handleChangeElement}>
            {listCurrency.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant={'primary'} onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalViewDetail;
