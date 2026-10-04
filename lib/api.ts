import axios from "axios";
import { storage } from "./storage";
import { navigateToNearestOpenRoute } from "@/actions/nearest-route-naivatge";
import { API_BASE_URL } from "@/config";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({
    url,
    method,
    data,
    params,
    headers = {},
  }: {
    url: string;
    method: string;
    data?: any;
    params?: string;
    headers?: any;
  }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: false,
        headers: {
          Authorization: `Bearer ${storage.fetch.authToken()}`,
          ...headers,
        },
      });
      return result.data;
    } catch (axiosError: any) {
      const err = axiosError;
      if (err?.response?.data.status === "UNAUTHORIZED") {
        // logout user
        navigateToNearestOpenRoute();
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseQuery = axiosBaseQuery({
  baseUrl: `${API_BASE_URL}/api/userapp`,
});
export const baseNextQuery = axiosBaseQuery({ baseUrl: "" });
