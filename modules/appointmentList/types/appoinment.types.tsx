export interface Appointment{
    id: number | string
    customer_name:string,
    customer_price:string,
    appoinment_date:string
    appoinment_time:number
    notes?:string
}