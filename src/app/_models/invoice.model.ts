import mongoose, { Schema } from "mongoose";

type SchemaType = {
  invoicenumber: string;
  amount: number;
  paymentmethod: string;
  paymentstatus: string;
};
const InvoiceSchema = new Schema<SchemaType>({
  invoicenumber: {
    type: String,
    unique: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentmethod: {
    type: String,
    required: true,
  },
  paymentstatus: {
    type: String,
    required: true,
  },
});
const InvoiceModel =
  mongoose.models.Invoice ?? mongoose.model("Invoice", InvoiceSchema);
export default InvoiceModel;
