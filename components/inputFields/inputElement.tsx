import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputElementProps {
  label: string;
  name: string;
  placeholder?: string;
  err?: string;
  type: string;
  disabled?: boolean;
  defaultValue?: string;
}

export default function InputElement({
  label,
  name,
  err,
  type,
  placeholder,
  disabled = false,
  defaultValue,
  // value,
}: InputElementProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {err && <span className="text-red-700 text-sm">{err}</span>}
    </div>
  );
}
