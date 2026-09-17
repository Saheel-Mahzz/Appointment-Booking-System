import { z } from "zod"

export const bookingSchema = z.object({
  customer_name: z.string().trim().min(2, "Customer name is required"),
  customer_phone: z.string().trim().min(7, "Enter a valid phone number"),
  appointment_time: z.string().min(1, "Appointment time is required"),
  appointment_date: z.string().min(1, "Appointment date is required"),
  service: z.string().min(1, "Please select a service"),
  notes: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
