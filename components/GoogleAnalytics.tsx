// app/components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-20THRP8D3N"; // Replace with your GA4 ID

export function GoogleAnalytics() {
  return (
    <>
      {/* GA initialization in <head> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* GA config */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
