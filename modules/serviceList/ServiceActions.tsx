"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateService, deleteService } from "./api/serviceActions"
import { Service } from "./types/sevices.types"

export default function ServiceActions({ service }: { service: Service }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(service)

  async function handleUpdate() {
    await updateService(service.id, {
      name: form.name,
      description: form.description,
      duration: form.duration,
      price: form.price,
    })
    setEditing(false)
  }

  async function handleDelete() {
    if (window.confirm(`Delete ${service.name}?`)) {
      await deleteService(service.id)
    }
  }

  if (editing) {
    return (
      <div className="flex min-w-64 flex-col gap-2">
        <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <Input value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} />
        <Input type="number" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} />
        <div className="flex gap-2">
          <Button size="sm" onClick={handleUpdate}>Save</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button size="icon-sm" variant="ghost" aria-label={`Edit ${service.name}`} onClick={() => setEditing(true)}>
        <Pencil />
      </Button>
      <Button size="icon-sm" variant="ghost" aria-label={`Delete ${service.name}`} onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  )
}
