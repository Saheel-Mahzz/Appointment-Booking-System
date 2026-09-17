import { cax } from "@/lib/axios";
import { AxiosError } from "axios";

interface BookingActionResponse {
  data?: string;
  success: boolean;
  message: string;
}

export async function creatBookingAction(
  prevState: BookingActionResponse,
  formData: FormData,
) {
  const rawData = {
    customer_name:formData?.get("customer_name"),
    customer_email: formData?.get("customer_email"),
    customer_phone: formData?.get("customer_phone"),
    appointment_date: formData?.get("appointment_date"),
    appointment_time: formData?.get("appointment_time"),
    service: JSON.parse(formData?.get("service") as string),
  };

  try {
    const res = await cax.post("/services/", rawData);
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
