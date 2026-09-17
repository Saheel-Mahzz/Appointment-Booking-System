import { cax } from "@/lib/axios"
import { Service } from "@/modules/serviceList/types/sevices.types"

export async function getAppoinments() {
  const res = await cax.get<Service[]>("/services/")
  return res
}