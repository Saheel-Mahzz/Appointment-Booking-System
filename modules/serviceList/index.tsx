import { Column, List } from '@/components/ui/list'
import React from 'react'
import { getServices } from './api/getServices'
import { Service } from './types/sevices.types'
export default async function ServiceList() {
 
    const services =await getServices()
    
  const allServices = services?.data || [];

  console.log('all servcies',allServices)
   const columns: Column<Service>[] = [
    {
      header: "S.N",
      accessorKey: "",
      cell: (_, index) => {
        return <span>{(index || 0) + 1}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Duration",
      accessorKey: "duration",
    },
    // {
    //   header: "Actions",
    //   accessorKey: "actions",
    //   cell: (row) => {
    //     return <BusModel row={row} />;
    //   },
    // },
  ];
//   const totalCount = response?.data?.count || 0;
//   const allBooking = response?.data?.results || [];

  return (
  <>
      <div className="w-full max-w-5xl mx-auto my-7">
        <h2 className='text-2xl text-center'>Services</h2>
      <List
        columns={columns}
        rows={allServices}
      />
    </div>

    </>
  )
}
