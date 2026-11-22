import type { CollectionConfig } from "payload";
import { nobody, signedIn } from "../access";

// Orders paid through Paystack. The checkout server action creates the order
// as "pending" with a unique reference, Paystack takes the payment, and the
// verify step / webhook marks it "paid". The owner then moves it through
// fulfilment from /admin. Amounts are in naira (Paystack wants kobo, ×100,
// which the payment code handles).
export const Orders: CollectionConfig = {
  slug: "orders",
  labels: { singular: "Order", plural: "Orders" },
  admin: {
    useAsTitle: "reference",
    group: "Customers",
    defaultColumns: ["reference", "customerName", "total", "status", "createdAt"],
    listSearchableFields: ["reference", "customerName", "email", "phone"],
  },
  access: { read: signedIn, create: nobody, update: signedIn, delete: signedIn },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "reference", type: "text", required: true, unique: true, index: true, admin: { readOnly: true, width: "50%" } },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "pending",
          options: [
            { label: "Awaiting payment", value: "pending" },
            { label: "Paid", value: "paid" },
            { label: "Payment failed", value: "failed" },
            { label: "Dispatched", value: "dispatched" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Refunded", value: "refunded" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Customer",
      fields: [
        {
          type: "row",
          fields: [
            { name: "customerName", label: "Name", type: "text", required: true, admin: { width: "34%" } },
            { name: "email", type: "email", required: true, admin: { width: "33%" } },
            { name: "phone", label: "Phone / WhatsApp", type: "text", required: true, admin: { width: "33%" } },
          ],
        },
        {
          name: "delivery",
          type: "group",
          fields: [
            { name: "address", type: "textarea" },
            {
              type: "row",
              fields: [
                { name: "city", type: "text", admin: { width: "50%" } },
                { name: "state", type: "text", admin: { width: "50%" } },
              ],
            },
            { name: "note", label: "Customer note", type: "textarea" },
          ],
        },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            { name: "product", type: "relationship", relationTo: "products", admin: { width: "40%" } },
            { name: "name", type: "text", required: true, admin: { width: "30%", description: "Copied at checkout" } },
            { name: "unitPrice", label: "Price (₦)", type: "number", required: true, admin: { width: "15%" } },
            { name: "quantity", type: "number", required: true, defaultValue: 1, min: 1, admin: { width: "15%" } },
          ],
        },
        { name: "variant", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "subtotal", label: "Subtotal (₦)", type: "number", required: true, admin: { width: "34%" } },
        { name: "deliveryFee", label: "Delivery (₦)", type: "number", defaultValue: 0, admin: { width: "33%" } },
        { name: "total", label: "Total (₦)", type: "number", required: true, admin: { width: "33%" } },
      ],
    },
    {
      name: "payment",
      type: "group",
      admin: { description: "Filled in from Paystack. Don’t edit by hand." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "paystackId", label: "Paystack transaction ID", type: "text", admin: { readOnly: true, width: "34%" } },
            { name: "channel", type: "text", admin: { readOnly: true, width: "33%" } },
            { name: "paidAt", type: "date", admin: { readOnly: true, width: "33%", date: { pickerAppearance: "dayAndTime" } } },
          ],
        },
        { name: "amountPaid", label: "Amount received (₦)", type: "number", admin: { readOnly: true } },
      ],
    },
    { name: "internalNote", label: "Notes for the team", type: "textarea", admin: { position: "sidebar" } },
  ],
};
