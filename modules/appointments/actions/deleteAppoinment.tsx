"use server"

import { cax } from "@/lib/axios"

export async function deleteAppointment(id: number | string) {
  await cax.delete(`/appointments/${id}/`)
}
