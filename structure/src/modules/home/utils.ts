import moment from "moment";
import { IDateValidate, IStatusValidate } from "../../models/payroll";
import { status } from "./constants";

export const validStatus = (values: IStatusValidate) => {
    if (values.received) {
        return status.RECEIVED
    }
    if (values.date_matched || values.approved) {
        return status.PROCCESSING
    }
    if (values.fulfilled) {
        return status.FULLFILED
    }
    if (values.canceled) {
        return status.CANCLED
    }
    return status.PENDING
}

export const validColorStatus = (values: string) => {
    switch (values) {
        case status.FULLFILED:
            return 'green'
        case status.PENDING:
            return 'grey'
        case status.PROCCESSING:
            return 'yellow'
        case status.RECEIVED:
            return 'blue'
        default: 
            return 'black'
    }
}

export const validDate = (values: string ) => {
    return moment(values).format('Do MMMM YYYY')
}

export const validTotal = (values: number) => {
    return values.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
