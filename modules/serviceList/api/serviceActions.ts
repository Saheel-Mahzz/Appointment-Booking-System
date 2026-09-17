import { cax } from "@/lib/axios"
import { Service } from "../types/sevices.types"

export async function updateService(id: Service["id"], service: Partial<Service>) {
  return cax.patch<Service>(`/services/${id}/`, service)
}

export async function deleteService(id: Service["id"]) {
  return cax.delete(`/services/${id}/`)
}
