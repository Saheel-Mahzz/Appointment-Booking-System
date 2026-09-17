import { Column } from '@/components/ui/list'
import React from 'react'
import { getServices } from './api/getServices'


interface dummy {
    name:string
    age:string
}

export default async function ServiceList() {
 
    const services =await getServices()
    console.log('services',services)
//   const totalCount = response?.data?.count || 0;
//   const allBooking = response?.data?.results || [];

  return (
    <div>
      I am service list
    </div>
  )
}
