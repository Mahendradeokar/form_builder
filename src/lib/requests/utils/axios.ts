import axios from "axios";

export const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BaseResponse {
  statusCode: number;
  message: string;
  data: Record<any, any> | any[] | string;
}
