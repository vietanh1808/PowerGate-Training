import moment from "moment";
import { IDateValidate, IStatusValidate, ITotalValidate } from "../../models/payroll";
import { status } from "./constants";

export const validStatus = (values: IStatusValidate) => {
    const listStatus = Object.values(status)
    return listStatus[Math.floor(Math.random()*listStatus.length)]
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

export const validDate = (values: IDateValidate) => {
    return moment(values.time_created).format('Do MMMM YYYY')
}

export const validTotal = (values: ITotalValidate) => {
    const money = values.fees * values.volume_input_in_input_currency + values.volume_input_in_input_currency

    return money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export const validatePayrollItem = () => {

}