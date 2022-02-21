import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPayrollItem } from '../../../models/payroll';
import { AppState } from '../../../redux/reducer';
import DatePicker from '../components/payroll/DatePicker';
import ModalDelete from '../components/payroll/ModalDelete';
import Selector from '../components/payroll/Selector';
import { LIST_PAYROLL } from '../contants/mock_data';
import { status } from '../constants';
import { setPayroll } from '../redux/payrollReducer';
import { validColorStatus, validDate, validStatus, validTotal } from '../utils';

interface IPayrollFilter {
  status: string;
  client: string;
  date_begin: string;
  date_end: string;
  invoice: string;
}

const numberItemPage = 10;

const PayrollPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [currentItems, setCurrentItems] = useState<IPayrollItem[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [dateValueFrom, setDateValueFrom] = useState<string>('');
  const [dateValueTo, setDateValueTo] = useState<string>('');
  const [selectValue, setSelectValue] = useState('');
  const [payrolls, setPayrolls] = useState<IPayrollItem[]>([]);
  const [formFilter, setFormFilter] = useState({
    status: '',
    client: '',
    date_begin: '',
    date_end: '',
    invoice: '',
  });

  const fetchData = async () => {
    const data1 = LIST_PAYROLL.payrolls;
    const list: any = [];
    data1.slice(0, 50).map((d, i) => {
      const status = validStatus({ ...d });
      const date = validDate({ ...d });
      const total = validTotal({ ...d });
      list.push({ status: status, date: date, total: total, client: '', currency: d.currency, invoice: d.payroll_id });
    });
    setPayrolls(list);
    // dispatch Payroll Item here
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + numberItemPage;
    setCurrentItems(payrolls.slice(itemOffset, endOffset));
    setPageNumber(Math.ceil(payrolls.length / numberItemPage));
  }, [itemOffset, numberItemPage, payrolls]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * numberItemPage) % payrolls.length;
    setItemOffset(newOffset);
  };

  const handleDelete = () => {
    setShowModal(!showModal);
  };

  const handleSave = () => {
    setShowModal(!showModal);
  };

  const handleChangeDateFrom = useCallback((event: any) => {
    setDateValueFrom(event.target.value);
  }, []);

  const handleChangeDateTo = useCallback((event: any) => {
    setDateValueTo(event.target.value);
  }, []);

  const handleChangeSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleChangeSelectClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleClickHeadTable = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
    currentItems.sort((a, b) => {
      const index = Object.keys(a).findIndex((element) => element === event.currentTarget.id);
      const left = Object.values(a)[index].toUpperCase();
      const right = Object.values(b)[index].toUpperCase();
      if (left < right) {
        return -1;
      }
      if (left > right) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  const handleClear = () => {};
  return (
    <div className="container p-20 bg-light">
      <ModalDelete onHide={handleDelete} show={showModal} onSave={handleSave} />
      <div className="body">
        <div className="d-flex justify-content-between" style={{ marginTop: 20 }}>
          <div style={{ color: '#2D53B8', fontWeight: 700, fontSize: 'large' }}>Payroll Transaction List</div>
          <select className="form-select" style={{ width: 130, backgroundColor: 'dodgerblue', color: 'white' }}>
            <option value="">Export CSV</option>
            <option value="">Export Excel</option>
          </select>
        </div>
        <div className="d-flex justify-content-between" style={{ marginTop: 20 }}>
          <Selector
            data={Object.values(status)}
            style={{ width: 130 }}
            onChange={handleChangeSelectStatus}
            placeholder="Status"
          />
          <Selector
            data={Object.values(status)}
            style={{ width: 130 }}
            placeholder="Client"
            onChange={handleChangeSelectClient}
          />

          <DatePicker onChange={handleChangeDateFrom} value={dateValueFrom} placeholder={'From'} />
          <DatePicker onChange={handleChangeDateTo} value={dateValueTo} min={dateValueFrom} placeholder="To" />

          <input style={{ width: 165 }} type={'text'} className="form-control" placeholder="Invoices #" />

          <button type="button" className="btn btn-outline-primary" style={{ paddingRight: 35, paddingLeft: 35 }}>
            Apply
          </button>
          <button
            onClick={handleClear}
            type="button"
            className="btn btn-outline-danger"
            style={{ paddingRight: 35, paddingLeft: 35 }}
          >
            Clear
          </button>
        </div>
        <table className="table table-hover table-borderless">
          <thead>
            <tr>
              {Object.keys(payrolls[0] || {}).map((f, i) => (
                <th key={i} onClick={handleClickHeadTable} scope="col" id={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((element, index) => (
              <tr key={index}>
                <td>
                  <div style={{ color: validColorStatus(element.status) }}>{element.status}</div>
                </td>
                <td>{element.date}</td>
                <td>{element.client}</td>
                <td>{element.currency}</td>
                <td>{element.total}</td>
                <td>
                  <div className="text-truncate" style={{ width: 170 }}>
                    {element.invoice}
                  </div>
                </td>
                <td>
                  <button
                    className="form-select btn-outline-secondary"
                    style={{ width: 130, color: 'black', borderColor: 'black', borderRadius: 30, marginLeft: 10 }}
                  >
                    View Detail
                  </button>
                </td>
                <td>
                  <button onClick={handleDelete} className="btn btn-outline-danger">
                    <i className="bi bi-activity">Xóa</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          Showing <strong>{itemOffset + numberItemPage}</strong> of <strong>{payrolls.length}</strong> data
        </div>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageNumber}
          nextLabel=">"
          previousLabel="<"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
        />
      </div>
    </div>
  );
};

export default PayrollPage;
