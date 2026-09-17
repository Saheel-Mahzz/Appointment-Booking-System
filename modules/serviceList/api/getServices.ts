import { cax } from "@/lib/axios"
import { IListReponse } from "@/types/apiResponse"
import { Service } from "../types/sevices.types"

export async function  getServices(){
 const res = await cax.get<IListReponse<Service>>('/services/')
 return res.data
}