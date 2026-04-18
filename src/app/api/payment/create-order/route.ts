import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, email, phone } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.CASHFREE_MODE || "sandbox"; // "sandbox" | "production"

    if (!appId || !secretKey) {
      // Demo mode — return a mock order
      return NextResponse.json({
        orderId: "order_demo_" + Date.now(),
        paymentSessionId: "demo_session_" + Date.now(),
        amount: amount || 49,
        currency: "INR",
        demo: true,
      });
    }

    const baseUrl =
      mode === "production"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const orderId = `CCA_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const payload = {
      order_id: orderId,
      order_amount: amount || 49,
      order_currency: "INR",
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_email: email || "user@example.com",
        customer_phone: phone || "9999999999",
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/return?order_id={order_id}`,
      },
      order_note: "Career Clarity AI Report",
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree order error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
      amount: data.order_amount,
      currency: data.order_currency,
    });
  } catch (error: any) {
    console.error("Order creation error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
