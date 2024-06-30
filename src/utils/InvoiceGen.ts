export default function InvoiceGenerator(length: number): string {
  const numb = "0123456789";
  let InvoiceNumber = "";
  for (let i = 0; i < length; i++) {
    InvoiceNumber += numb[Math.floor(Math.random() * 9)];
  }
  return "INV" + InvoiceNumber;
}
