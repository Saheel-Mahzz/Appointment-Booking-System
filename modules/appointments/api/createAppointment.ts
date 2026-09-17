import { cax } from "@/lib/axios"
import { Appointment } from "../types/appointment.types"

export async function createAppointment(appointment: Omit<Appointment, "id">) {
  return cax.post<Appointment>("/appointments/", appointment)
}
