import axios from "axios";

export const cax = axios.create({
    baseURL:process.env.NEXT_API_URL
})