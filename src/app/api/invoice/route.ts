import connectDb from "@/utils/connectDB.util";

import InvoiceModel from "../../_models/invoice.model";

export async function GET() {
  connectDb();
  const dbResponse = await InvoiceModel.find({});
  return Response.json(dbResponse, { status: 200 });
}

export async function POST(req: Request, res: Response) {
  connectDb();
  const data = await req.formData();
  const invoicenumber = data.get("invoicenumber");
  const amount = data.get("amount");
  const paymentstatus = data.get("paymentstatus");
  const paymentmethod = data.get("paymentmethod");
  try {
    const dbResponse = await InvoiceModel.create({
      invoicenumber: invoicenumber,
      amount: amount,
      paymentstatus: paymentstatus,
      paymentmethod: paymentmethod,
    });
    return Response.json(dbResponse, { status: 201 });
  } catch (err) {
    console.error(err);
  }
}
