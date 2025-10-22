import { useQuery } from "@tanstack/react-query";
import api from "../client";
import { API_ENDPOINTS } from "../endpoints";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get(API_ENDPOINTS.PRODUCTS);
      return data;
    },
  });
}
