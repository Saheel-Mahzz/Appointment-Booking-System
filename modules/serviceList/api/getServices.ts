import { cax } from "@/lib/axios"
import { Service } from "../types/sevices.types"

export async function getServices() {
  const res = await cax.get<Service[]>("/services/")
  return res
}