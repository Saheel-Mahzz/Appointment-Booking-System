"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteService, updateService } from "./api/serviceActions"
import { Service } from "./types/sevices.types"

export default function ServiceActions({ service }: { service: Service }) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [form, setForm] = useState(service)

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await updateService(service.id, {
      name: form.name,
      description: form.description,
      duration: form.duration,
      price: form.price,
    })
    setEditOpen(false)
  }

  async function handleDelete() {
    await deleteService(service.id)
    setDeleteOpen(false)
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={`Edit ${service.name}`}
          onClick={() => setEditOpen(true)}
        >
          <Pencil />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={`Delete ${service.name}`}
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 />
        </Button>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit service</DialogTitle>
            <DialogDescription>
              Update the service details below.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={handleUpdate}>
            <label className="text-sm font-medium">
              Name
              <Input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label className="text-sm font-medium">
              Description
              <Textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </label>
            <label className="text-sm font-medium">
              Duration
              <Input
                value={form.duration}
                onChange={(event) => setForm({ ...form, duration: event.target.value })}
              />
            </label>
            <label className="text-sm font-medium">
              Price
              <Input
                type="number"
                value={form.price}
                onChange={(event) =>
                  setForm({ ...form, price: Number(event.target.value) })
                }
              />
            </label>
            <DialogFooter showCloseButton>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete service?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {service.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
