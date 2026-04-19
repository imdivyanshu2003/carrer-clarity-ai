import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.CASHFREE_MODE || "sandbox";

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: "Cashfree not configured" },
        { status: 500 }
      );
    }

    const baseUrl =
      mode === "production"
        ? `https://api.cashfree.com/pg/orders/${orderId}`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree verify error:", data);
      return NextResponse.json(
        { error: data.message || "Verification failed", verified: false },
        { status: 400 }
      );
    }

    // order_status: ACTIVE | PAID | EXPIRED | TERMINATED
    const isPaid = data.order_status === "PAID";

    return NextResponse.json({
      verified: isPaid,
      status: data.order_status,
      orderId: data.order_id,
    });
  } catch (error: any) {
    console.error("Verification error:", error?.message || error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
