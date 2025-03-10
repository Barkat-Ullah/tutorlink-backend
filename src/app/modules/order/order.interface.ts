import { Document, Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  subjectId: Types.ObjectId;
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
