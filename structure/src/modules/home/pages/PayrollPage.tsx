import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPayrollItem, ITotal, IUpdatePayroll } from '../../../models/payroll';
import { AppState } from '../../../redux/reducer';
import DatePicker from '../components/payroll/DatePicker';
import ModalDelete from '../components/payroll/ModalDelete';
import Selector from '../components/payroll/Selector';
import { LIST_PAYROLL } from '../contants/mock_data';
import { status } from '../constants';
import { setPayroll } from '../redux/payrollReducer';
import { validColorStatus, validDate, validStatus, validTotal } from '../utils';
import ModalViewDetail from '../components/payroll/ModalViewDetail';
import moment from 'moment';

const InitialForm = {
  status: '',
  client: '',
  date_begin: '',
  date_end: '',
  invoice: '',
  currency: '',
};

const numberItemPage = 10;

const PayrollPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const payrollStore = useSelector((state: AppState) => state.payrolls.payroll);

  const [currentItems, setCurrentItems] = useState<IPayrollItem[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [payrolls, setPayrolls] = useState<IPayrollItem[]>([]);
  const [formFilter, setFormFilter] = useState(InitialForm);
  const [enableFilter, setEnableFilter] = useState(false);
  const [indexChoosed, setIndexChoosed] = useState(0);
  const [totalField, setTotalField] = useState<ITotal[]>([]);

  const fetchData = async () => {
    const data1 = LIST_PAYROLL.payrolls;
    const list: any = [];
    const listTotal: any = [];
    data1.slice(0, 50).map((d, i) => {
      const status = validStatus({ ...d });
      const total = d.fees + d.volume_input_in_input_currency;
      listTotal.push({
        fees: d.fees,
        volume_input_in_input_currency: d.volume_input_in_input_currency,
      });

      list.push({
        status: status,
        date: d.time_created,
        total: total,
        client: '',
        currency: d.currency,
        invoice: d.payroll_id,
      });
    });
    setPayrolls(list);
    setTotalField(listTotal);
    // dispatch Payroll Item here
    dispatch(setPayroll(list));
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * numberItemPage) % payrolls.length;
    setItemOffset(newOffset);
  };

  const handleDelete = () => {
    setShowModal(!showModal);
  };

  const handleSave = () => {
    payrolls.splice(indexChoosed, 1);
    setShowModal(!showModal);
  };

  const handleChangeValueForm = (e: any) => {
    switch (e.target.id) {
      case 'Invoice':
        setFormFilter({ ...formFilter, invoice: e.target.value });
        break;
      case 'Client':
        setFormFilter({ ...formFilter, client: e.currentTarget.value });
        break;
      case 'Status':
        setFormFilter({ ...formFilter, status: e.currentTarget.value });
        break;
      case 'From':
        setFormFilter({ ...formFilter, date_begin: e.currentTarget.value });
        break;
      case 'To':
        setFormFilter({ ...formFilter, date_end: e.currentTarget.value });
        break;
      default:
        break;
    }
  };

  const handleClickHeadTable = useCallback(
    (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
      const clonetItem = [...payrolls];
      clonetItem.sort((a, b) => {
        const index = Object.keys(a).findIndex((element) => element === event.currentTarget.id);
        const left = Object.values(a)[index].toUpperCase();
        const right = Object.values(b)[index].toUpperCase();
        if (left < right) {
          return -1;
        }
        if (left > right) {
          return 1;
        }
        return 0;
      });
      setPayrolls(clonetItem);
    },
    [payrolls],
  );

  const handleClear = () => {
    setFormFilter(InitialForm);
    setPayrolls(payrollStore);
  };

  const handleApply = () => {
    if (!enableFilter) return;

    let dateFrom, dateTo, dateCompare;
    const filtedItems = payrolls.filter((item) => {
      if (formFilter.status) {
        if (item.status.toUpperCase() === formFilter.status.toUpperCase()) {
          return true;
        }
      }

      dateFrom = new Date(formFilter.date_begin);
      dateTo = new Date(formFilter.date_end);
      dateCompare = new Date(item.date);
      if (dateFrom) {
        if (dateTo) {
          if (dateFrom <= dateCompare && dateTo >= dateCompare) {
            return true;
          }
        } else if (dateFrom <= dateCompare) {
          return true;
        }
      } else if (dateTo) {
        if (dateTo >= dateCompare) {
          return true;
        }
      }

      if (formFilter.invoice) {
        if (item.invoice.includes(formFilter.invoice.trim())) {
          return true;
        }
      }

      return false;
    });
    setPayrolls(filtedItems);
    setEnableFilter(false);
  };

  const handleChangeForm = (e: any) => {
    setEnableFilter(true);
  };

  const handleViewDetail = (index: number) => (e: any) => {
    setIndexChoosed(index);
    setShowDetailModal(true);
  };

  const handleSaveDetail = (data: IUpdatePayroll) => {
    payrolls[indexChoosed] = {
      status: data.status,
      client: data.client,
      currency: data.currency,
      total: data.fees + data.volume_input_in_input_currency,
      invoice: data.invoice,
      date: moment(data.date).format(),
    };
  };
  const handleHideDetail = () => {
    setShowDetailModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + numberItemPage;
    setCurrentItems(payrolls.slice(itemOffset, endOffset));
    setPageNumber(Math.ceil(payrolls.length / numberItemPage));
  }, [itemOffset, numberItemPage, payrolls]);

  return (
    <div className="container p-20 bg-light">
      {showModal && (
        <ModalDelete data={payrolls[indexChoosed]} onHide={handleDelete} show={showModal} onSave={handleSave} />
      )}
      {showDetailModal && (
        <ModalViewDetail
          data={{
            ...payrolls[indexChoosed],
            fees: totalField[indexChoosed].fees,
            volume_input_in_input_currency: totalField[indexChoosed].volume_input_in_input_currency,
          }}
          onHide={handleHideDetail}
          show={showDetailModal}
          onSave={handleSaveDetail}
        />
      )}
      <div className="body">
        <div className="d-flex justify-content-between" style={{ marginTop: 20 }}>
          <div style={{ color: '#2D53B8', fontWeight: 700, fontSize: 'large' }}>Payroll Transaction List</div>
          <select className="form-select" style={{ width: 130, backgroundColor: 'dodgerblue', color: 'white' }}>
            <option value="">Export CSV</option>
            <option value="">Export Excel</option>
          </select>
        </div>
        <form action="" onChange={handleChangeForm}>
          <div className="d-flex justify-content-between" style={{ marginTop: 20 }}>
            <Selector
              id="Status"
              data={Object.values(status)}
              style={{ width: 130 }}
              onChange={handleChangeValueForm}
              placeholder="Status"
              value={formFilter.status}
            />
            <Selector
              id="Client"
              value={formFilter.client}
              data={[]}
              style={{ width: 130 }}
              placeholder="Client"
              onChange={handleChangeValueForm}
            />

            <DatePicker id="From" onChange={handleChangeValueForm} value={formFilter.date_begin} placeholder={'From'} />
            <DatePicker
              id="To"
              onChange={handleChangeValueForm}
              value={formFilter.date_end}
              min={formFilter.date_begin}
              placeholder="To"
            />

            <input
              id="Invoice"
              onChange={handleChangeValueForm}
              value={formFilter.invoice}
              style={{ width: 165 }}
              type={'text'}
              className="form-control"
              placeholder="Invoices #"
            />

            <button
              onClick={handleApply}
              type="button"
              className="btn btn-outline-primary"
              style={{ paddingRight: 35, paddingLeft: 35 }}
            >
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
        </form>
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
                <td>{validDate(element.date)}</td>
                <td>{validTotal(element.total)}</td>
                <td>{element.client}</td>
                <td>{element.currency}</td>
                <td>
                  <div className="text-truncate" style={{ width: 170 }}>
                    {element.invoice}
                  </div>
                </td>
                <td>
                  <button
                    className="form-select btn-outline-secondary"
                    style={{ width: 130, color: 'black', borderColor: 'black', borderRadius: 30, marginLeft: 10 }}
                    onClick={handleViewDetail(index)}
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
