import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcomponents/ui/table";
import axios from "axios";

async function InvoiceTable() {
  const axiosResponse = await axios.get("http://localhost:3000/api/invoice");

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {axiosResponse.data.map(
          (data: {
            _id: string;
            invoicenumber: string;
            amount: number;
            paymentstatus: string;
            paymentmethod: string;
          }) => (
            <TableRow key={data._id}>
              <TableCell className="font-medium">
                {data.invoicenumber}
              </TableCell>
              <TableCell
                className={`${
                  data.paymentstatus === "PAID"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {data.paymentstatus}
              </TableCell>
              <TableCell>{data.paymentmethod}</TableCell>
              <TableCell
                className={`${
                  data.paymentstatus === "PAID"
                    ? "text-green-500"
                    : "text-orange-500"
                } text-right`}
              >
                ₹{data.amount}
              </TableCell>
            </TableRow>
          )
        )}
        <TableRow>
          <TableCell className="font-bold">Total</TableCell>
          <TableCell className="font-bold"></TableCell>
          <TableCell className="font-bold"></TableCell>
          <TableCell className="font-bold"></TableCell>
          <TableCell className="font-bold">
            {" "}
            ₹
            {axiosResponse.data
              .map(
                (data: {
                  _id: string;
                  invoicenumber: string;
                  amount: number;
                  paymentstatus: string;
                  paymentmethod: string;
                }) => data.amount
              )
              .reduce((prev: number, curr: number) => (prev += curr))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default InvoiceTable;
