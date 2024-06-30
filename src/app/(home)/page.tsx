"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcomponents/ui/form";
import { Input } from "@/shadcomponents/ui/input";
import formSchema from "@/validations/form/validation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/shadcomponents/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/shadcomponents/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import InvoiceGenerator from "@/utils/InvoiceGen";
function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentstatus: "PAID",
      paymentmethod: "UPI",
      amount: "",
    },
  });
  const onHandleSubmit = (values: z.infer<typeof formSchema>) => {
    const data = axios.post(
      "/api/invoice",
      {
        invoicenumber: InvoiceGenerator(6),
        paymentstatus: values.paymentstatus,
        paymentmethod: values.paymentmethod,
        amount: parseInt(values.amount),
      },
      { headers: { "content-type": "application/x-www-form-urlencoded" } }
    );
    data.then((res) => {
      router.refresh();
      form.reset()
    });
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit)}
          className="space-y-28 flex items-center justify-center gap-10"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter Amount" {...field} />
                </FormControl>
                <FormDescription>Enter the Amount of the Item</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller 
            control={form.control}
            name="paymentstatus"
            defaultValue={`PAID`}
            render={({ field: { onChange, value, name } }) => (
              <Select onValueChange={onChange} value={value} name={name}>
                <SelectTrigger className="w-[140px] relative bottom-12 left-16 bg-gray-200">
                  <SelectValue placeholder="Post Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Payment Status</SelectLabel>
                    <SelectItem value="PAID">
                      <div className="flex items-center gap-2">
                        <span>PAID</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="PENDING">
                      <div className="flex items-center gap-2">
                        <span>PENDING</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            control={form.control}
            name="paymentmethod"
            defaultValue={`UPI`}
            render={({ field: { onChange, value, name } }) => (
              <Select onValueChange={onChange} value={value} name={name}>
                <SelectTrigger className="w-[140px] relative bottom-12 left-16 bg-gray-200">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Payment Method</SelectLabel>
                    <SelectItem value="BANKTRANSFER">
                      <div className="flex items-center gap-2">
                        <span>BANK TRANSFER</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="CREDITCARD">
                      <div className="flex items-center gap-2">
                        <span>CREDIT CARD</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="DEBITCARD">
                      <div className="flex items-center gap-2">
                        <span>DEBIT CARD</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="UPI">
                      <div className="flex items-center gap-2">
                        <span>UPI</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Home;
