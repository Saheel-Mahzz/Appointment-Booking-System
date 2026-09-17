import { Column, List } from '@/components/ui/list'
import React from 'react'
import { getAppoinments } from './api/getAppoinment';
import { Service } from '../serviceList/types/sevices.types';
import { Appointment } from './types/appoinment.types';
import ServiceActions from '../serviceList/ServiceActions';

export default async function ServiceList() {
 
    const appoinments =await getAppoinments()
    
  const allServices = appoinments?.data || [];

   const columns: Column<Appointment>[] = [
    {
      header: "S.N",
      accessorKey: "",
      cell: (_, index) => {
        return <span>{(index || 0) + 1}</span>;
      },
    },
    {
      header: "Customer Name",
      accessorKey: "customer_name",
    },
    {
      header: "Customer Price",
      accessorKey: "customer_price",
    },
    {
      header: "Appoinment Date",
      accessorKey: "appoinment_date",
    },
    {
      header: "Appoinment Time",
      accessorKey: "appoinment_time",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row) => <ServiceActions service={row} />,
    },
  ];

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
