import axios from "axios";
export async function PostInvoice(data: object) {
  const fetchData = await axios.post("/api/invoice", data);
  return fetchData;
}
export async function getInvoice() {
  const fetchData = await axios.get("/api/invoice");
  return fetchData;
}
