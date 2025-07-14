"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AdBannerProps {
  slot: "top-banner" | "sidebar" | "in-content"
  className?: string
}

export function AdBanner({ slot, className }: AdBannerProps) {
  const getAdDimensions = () => {
    switch (slot) {
      case "top-banner":
        return "h-20 sm:h-24"
      case "sidebar":
        return "h-64 sm:h-80"
      case "in-content":
        return "h-32 sm:h-40"
      default:
        return "h-32"
    }
  }

  const getAdContent = () => {
    switch (slot) {
      case "top-banner":
        return {
          title: "Advertisement",
          subtitle: "728x90 Banner Ad Space",
          size: "728x90",
        }
      case "sidebar":
        return {
          title: "Sponsored",
          subtitle: "300x250 Rectangle Ad",
          size: "300x250",
        }
      case "in-content":
        return {
          title: "Advertisement",
          subtitle: "320x100 Mobile Banner",
          size: "320x100",
        }
      default:
        return {
          title: "Ad Space",
          subtitle: "Advertisement",
          size: "Auto",
        }
    }
  }

  const adContent = getAdContent()

  return (
    <Card
      className={cn(
        "bg-gray-50 dark:bg-gray-900 border-dashed border-gray-300 dark:border-gray-700",
        getAdDimensions(),
        className,
      )}
    >
      <CardContent className="h-full flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{adContent.title}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{adContent.subtitle}</p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">{adContent.size}</p>
        </div>

        {/* Placeholder for actual ad code */}
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-center">
          {/* Replace this div with actual ad code like Google AdSense */}
          {/* <ins className="adsbygoogle" style={{display:"block"}} data-ad-client="ca-pub-xxxxxxxx" data-ad-slot="xxxxxxxx"></ins> */}
        </div>
      </CardContent>
    </Card>
  )
}
