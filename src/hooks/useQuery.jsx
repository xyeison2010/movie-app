import { useLocation } from "react-router";

export function useQuery() {
  return new URLSearchParams(useLocation().search); //un hook de react router 
}
