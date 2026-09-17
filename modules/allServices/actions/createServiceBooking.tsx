import { AxiosError } from "axios";
import { bookingSchema } from "../schemas/bookingSchema";
import { createAppointment } from "../../appointments/api/createAppointment";

interface BookingActionResponse {
  data?: string;
  success: boolean;
  message: string;
}

export async function creatBookingAction(
  prevState: BookingActionResponse,
  formData: FormData,
) {
  const parsedData = bookingSchema.safeParse({
    customer_name: formData.get("customer_name"),
    customer_phone: formData.get("customer_phone"),
    appointment_date: formData.get("appointment_date"),
    appointment_time: formData.get("appointment_time"),
    service: formData.get("service"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  try {
    const res = await createAppointment(parsedData.data);
    return {
      data: res?.data,
      success: true,
      message: "Service Booked Successfully!",
    };
  } catch (err) {
    let errorMessage;
    if (err instanceof AxiosError) {
      errorMessage = err?.response?.data?.non_field_errors[0];
    }
    return {
      success: false,
      message: errorMessage ?? "Something went wrong!",
    };
  }
}
