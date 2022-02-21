import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayrollItem, IPayrollParams } from '../../../models/payroll';

export interface IPayroll {
  payroll: Array<IPayrollItem>,
}

export const setPayroll = (payroll: Array<IPayrollParams>) => {
  return setPayrollAction(payroll);
};

const setPayrollAction = createCustomAction('payroll/setPayroll', (payroll: Array<IPayrollParams>) => ({
    payroll
  }));

const setStatusAction = createCustomAction('payroll/setStatus', (status: string, index: number) => ({
  index,
  status
}));

const setDateAction = createCustomAction('payroll/setDate', (date: string, index: number) => ({
  index,
  date
}));

const setClientAction = createCustomAction('payroll/setClient', (client: string, index: number) => ({
  index,
  client
}));

const setCurrencyAction = createCustomAction('payroll/setCurrency', (currency: string, index: number) => ({
  index,
  currency
}));

const setTotalAction = createCustomAction('payroll/setTotal', (total: number, index: number) => ({
  index,
  total
}));

const setInvoiceAction = createCustomAction('payroll/setInvoice', (invoice: string, index: number) => ({
  index,
  invoice
}));

const actions = { setPayrollAction, setDateAction, setClientAction, setCurrencyAction, setTotalAction, setInvoiceAction, setStatusAction };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: IPayroll = {
    payroll: [],
  }, 
  action: Action,
) {
  switch (action.type) {
    case getType(setPayrollAction):
      return  { ...state, payroll: action.payroll };
    case getType(setStatusAction):
      return  { ...state, };
    case getType(setDateAction):
      return  { ...state, payroll: action.date };
    case getType(setClientAction):
      return  { ...state, payroll: action.client };
    case getType(setCurrencyAction):
      return  { ...state, payroll: action.currency };
    case getType(setTotalAction):
      return  { ...state, payroll: action.total };
    case getType(setInvoiceAction):
      return  { ...state, payroll: action.invoice };
    default:
      return state;
  }
}
