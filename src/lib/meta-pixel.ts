// Meta Pixel helper — fires conversion events for ad optimization
export const META_PIXEL_ID = "1290731092392108";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

type StandardEvent =
  | "PageView"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase"
  | "CompleteRegistration"
  | "AddToCart"
  | "ViewContent";

export function trackEvent(
  event: StandardEvent,
  params?: Record<string, any>
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    if (params) {
      window.fbq("track", event, params);
    } else {
      window.fbq("track", event);
    }
  } catch (e) {
    console.warn("Meta Pixel track error:", e);
  }
}

export function trackPurchase(value: number, currency: string = "INR") {
  trackEvent("Purchase", { value, currency });
}

export function trackInitiateCheckout(value: number, currency: string = "INR") {
  trackEvent("InitiateCheckout", { value, currency });
}

export function trackLead() {
  trackEvent("Lead");
}
