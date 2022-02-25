export interface IPayrollParams {
    approved: boolean,
    canceled: boolean,
    company_id: string,
    confirmed: boolean,
    currency: string,
    date_canceled: null | string,
    date_confirmed: null | string,
    date_fulfilled: null | string,
    date_matched: null | string,
    date_processed: null | string,
    date_received: null | string,
    date_released: null | string,
    fees: number,
    fulfilled: boolean,
    is_premium: boolean,
    matched: boolean,
    number_of_recipients: number,
    payment_type: string,
    payroll_id: string,
    received: boolean,
    released: boolean,
    subpayroll_ids: Array<string>,
    time_created: string,
    volume_input_in_input_currency: number,
}

export interface IPayrollItem {
    status: string;
    date: string;
    client: string;
    currency: string;
    total: number;
    invoice: string;
}

export interface IStatusValidate {
    approved: boolean,
    canceled: boolean,
    confirmed: boolean,
    fulfilled: boolean,
    received: boolean,
    released: boolean,
    date_canceled: string | null,
    date_confirmed:string | null,
    date_fulfilled: string | null,
    date_matched:string | null,
    date_processed:string | null,
    date_received:string | null,
    date_released: string | null,
}

export interface IDateValidate {
    approved: boolean,
    canceled: boolean,
    confirmed: boolean,
    fulfilled: boolean,
    received: boolean,
    released: boolean,
    date_canceled: string | null,
    date_confirmed:string | null,
    date_fulfilled: string | null,
    date_matched:string | null,
    date_processed:string | null,
    date_received:string | null,
    date_released: string | null,
    time_created: string
}

export interface ITotal {
    fees: number,
    volume_input_in_input_currency: number
}

export interface IUpdatePayroll {
    status: string,
    date: string,
    client: string,
    currency: string,
    total: number,
    invoice: string,
    fees: number,
    volume_input_in_input_currency: number
}