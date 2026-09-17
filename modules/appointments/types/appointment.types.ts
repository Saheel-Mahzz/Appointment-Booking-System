export interface Appointment {
  id?: number | string
  customer_name: string
  customer_phone: string
  appointment_date: string
  appointment_time: string
  service: string
  notes?: string
}
