import { Column, List } from "@/components/ui/list"
import { getServices } from "../serviceList/api/getServices"
import { getAppointments } from "./api/appointmentActions"
import AppointmentActions from "./AppointmentActions"
import { Appointment } from "./types/appointment.types"

export default async function AppointmentList() {
  const [{ data: appointments }, { data: services }] = await Promise.all([
    getAppointments(),
    getServices(),
  ])

  const columns: Column<Appointment>[] = [
    { header: "Customer", accessorKey: "customer_name" },
    { header: "Phone", accessorKey: "customer_phone" },
    { header: "Date", accessorKey: "appointment_date" },
    { header: "Time", accessorKey: "appointment_time" },
    { header: "Service", accessorKey: "service" },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (appointment) => (
        <AppointmentActions appointment={appointment} services={services} />
      ),
    },
  ]

  return (
    <div className="mx-auto my-7 w-full max-w-6xl">
      <h2 className="text-center text-2xl">Appointments</h2>
      <List columns={columns} rows={appointments} />
    </div>
  )
}
