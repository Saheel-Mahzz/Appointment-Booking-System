"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { bookingSchema, type BookingFormValues } from "./schemas/bookingSchema"
import { Service } from "../serviceList/types/sevices.types"
import { createAppointment } from "../appointments/api/createAppointment"
import { Appointment } from "../appointments/types/appointment.types"

interface BookingDialogProps {
  services: Service[]
  initialValues?: Partial<Appointment>
  onSubmit?: (values: Omit<Appointment, "id">) => Promise<void>
  triggerLabel?: string
  title?: string
}

export default function BookingDialog({
  services,
  initialValues,
  onSubmit,
  triggerLabel = "Book appointment",
  title = "Book an appointment",
}: BookingDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormValues, string>>>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = bookingSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget).entries()),
    )
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])))
      return
    }
    setErrors({})
    if (onSubmit) {
      await onSubmit(result.data)
    } else {
      await createAppointment(result.data)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full " />}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Enter your details to request an appointment.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 sm:grid-cols-2 w-"  onSubmit={handleSubmit}>
          <Label>
            Customer name
            <Input name="customer_name" type="text" defaultValue={initialValues?.customer_name} err={errors.customer_name} />
          </Label>

          <Label>
            Customer phone
            <Input name="customer_phone" type="tel" defaultValue={initialValues?.customer_phone} err={errors.customer_phone} />
          </Label>

          <Label>
            Customer time
            <Input name="appointment_time" type="time" defaultValue={initialValues?.appointment_time} err={errors.appointment_time} />
          </Label>

          <Label>
            Appointment date
            <Input name="appointment_date" type="date" defaultValue={initialValues?.appointment_date} err={errors.appointment_date} />
          </Label>

          <Label className="sm:col-span-2">
            Select service
            <Select name="service" defaultValue={initialValues?.service}>
              <SelectTrigger className="w-full" aria-invalid={!!errors.service}>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={String(service.id)}>
                  {service.name}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
            {errors.service && <span className="text-xs text-destructive">{errors.service}</span>}
          </Label>

          <Label className="sm:col-span-2">
            Notes <span className="font-normal text-muted-foreground">(optional)</span>
            <Textarea name="notes" defaultValue={initialValues?.notes} err={errors.notes} />
          </Label>

          <DialogFooter className="sm:col-span-2" showCloseButton>
            <Button type="submit">{onSubmit ? "Save changes" : "Book appointment"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
