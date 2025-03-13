import User from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { orderUtils } from "./order.utils";

const createOrder = async (orderData: IOrder, client_ip: string) => {
  const { subjectId, userId, totalPrice } = orderData;
  const user = await User.findById(userId).select(
    "name email city address phone"
  );
  if (!user) {
    throw new Error("User not found");
  }

  let order = await Order.create({
    userId,
    subjectId,
    totalPrice,
  });
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: "017*********",
    customer_city: "unknown",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment?.checkout_url;
};

const getOrders = async () => {
  const data = await Order.find();
  return data;
};
const getOrdersByUser = async (userId: string) => {
  const orders = await Order.find({ userId });
  if (!orders.length) {
    throw new Error("No orders found for this user");
  }
  return orders;
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};
const updateOrderStatus = async (
  order_id: string,
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"
) => {
  const order = await Order.findById(order_id);
  if (!order) {
    throw new Error("Order not found");
  }
  order.status = status;
  await order.save();
  return order;
};
const deleteOrder = async (order_id: string) => {
  const order = await Order.findById(order_id);
  if (!order) {
    throw new Error("Order not found");
  }
  await Order.findByIdAndDelete(order_id);
};

export const OrderService = {
  createOrder,
  getOrders,
  verifyPayment,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
};
