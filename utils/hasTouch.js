// utils/hasTouch.js
export const hasTouchScreen = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false; // Return false if not in a browser environment
    }
  
    if ("maxTouchPoints" in navigator) {
      return navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      return navigator.msMaxTouchPoints > 0;
    } else {
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        return !!mQ.matches;
      } else if ('orientation' in window) {
        return true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        const UA = navigator.userAgent;
        return (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }
  };