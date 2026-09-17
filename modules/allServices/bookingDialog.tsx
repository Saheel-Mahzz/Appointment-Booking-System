"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const serviceOptions = [
  "General consultation",
  "Dental checkup",
  "Physical therapy",
]

const fieldClassName =
  "mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"

export default function BookingDialog() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full" />}>
        Book appointment
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Book an appointment</DialogTitle>
          <DialogDescription>
            Enter your details to request an appointment.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Customer name
            <input className={fieldClassName} type="text" />
          </label>

          <label className="text-sm font-medium">
            Customer phone
            <input className={fieldClassName} type="tel" />
          </label>

          <label className="text-sm font-medium">
            Customer time
            <input className={fieldClassName} type="time" />
          </label>

          <label className="text-sm font-medium">
            Appointment date
            <input className={fieldClassName} type="date" />
          </label>

          <label className="text-sm font-medium sm:col-span-2">
            Select service
            <select className={fieldClassName} defaultValue="">
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium sm:col-span-2">
            Notes <span className="font-normal text-muted-foreground">(optional)</span>
            <textarea className="mt-1 min-h-20 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
