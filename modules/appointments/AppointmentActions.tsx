"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import BookingDialog from "../allServices/bookingDialog"
import { deleteAppointment } from "./actions/deleteAppoinment"
import { updateAppointment } from "./api/appointmentActions"
import { Appointment } from "./types/appointment.types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AppointmentActions({
  appointment,
  services,
}: {
  appointment: Appointment
  services: import("../serviceList/types/sevices.types").Service[]
}) {
  if (appointment.id === undefined) return null

  return (
    <div className="flex gap-2">
      <BookingDialog
        services={services}
        initialValues={appointment}
        triggerLabel="Edit"
        title="Edit appointment"
        onSubmit={(values) => updateAppointment(appointment.id!, values).then(() => undefined)}
      />
      <Dialog>
        <DialogTrigger
          render={
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label={`Delete appointment for ${appointment.customer_name}`}
            />
          }
        >
          <Trash2 />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete appointment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment for{" "}
              {appointment.customer_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button
              variant="destructive"
              onClick={() => deleteAppointment(appointment.id!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
