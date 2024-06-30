import { z } from "zod";


const formSchema = z.object({
  paymentstatus: z.enum(['PENDING','PAID']),
  paymentmethod: z.enum(['BANKTRANSFER','CREDITCARD','DEBITCARD','UPI']),
  amount: z.string(),
});
export default formSchema;
