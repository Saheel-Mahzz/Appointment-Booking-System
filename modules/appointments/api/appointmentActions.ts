import { cax } from "@/lib/axios"
import { Appointment } from "../types/appointment.types"

export async function getAppointments() {
  return cax.get<Appointment[]>("/appointments/")
}

export async function updateAppointment(
  id: NonNullable<Appointment["id"]>,
  appointment: Omit<Appointment, "id">,
) {
  return cax.patch<Appointment>(`/appointments/${id}/`, appointment)
}
