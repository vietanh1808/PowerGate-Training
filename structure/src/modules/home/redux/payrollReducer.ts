import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayrollItem, IPayrollParams } from '../../../models/payroll';

export interface PayrollState {
  payroll: Array<IPayrollItem>,
}

export const setPayroll = (payroll: Array<IPayrollItem>) => {
  return setPayrollAction(payroll);
};

const setPayrollAction = createCustomAction('payroll/setPayroll', (payroll: Array<IPayrollItem>) => ({
    payroll
  }));

const actions = { setPayrollAction};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: PayrollState = {
    payroll: [],
  }, 
  action: Action,
) {
  switch (action.type) {
    case getType(setPayrollAction):
      return  { ...state, payroll: action.payroll };
    default:
      return state;
  }
}
