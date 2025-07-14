"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Heart, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DonationBannerProps {
  className?: string;
}

export function DonationBanner({ className }: DonationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card
      className={cn(
        "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800",
        className
      )}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="">
          {/* flex items-center justify-between gap-3 */}

          {/* <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 truncate">
                  Support Namveda
                </h3>
                 <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-200 line-clamp-2">
            Help keep our AI name generator free and growing with your support!
          </p>
              </div>
            </div> */}
          <div className="flex items-center gap-2 flex-shrink-0 justify-between">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm"
            >
              <Link href="/donate">
                <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Suport Us</span>
                <span className="sm:hidden">💝</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 "
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Gift, Heart, X } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface DonationBannerProps {
//   className?: string;
// }

// export function DonationBanner({ className }: DonationBannerProps) {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <Card
//       className={cn(
//         "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800",
//         className
//       )}
//     >
//       <CardContent className="p-3 sm:p-4">
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//             <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
//               <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-100 truncate">
//                 Support Namveda
//               </h3>
//               <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-200 line-clamp-2">
//                 Keep our AI name generator free for everyone! Your donation
//                 helps us improve and add new features.
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 flex-shrink-0">
//             <Button
//               asChild
//               size="sm"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm"
//             >
//               <Link href="/donate">
//                 <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//                 <span className="hidden sm:inline">Donate</span>
//                 <span className="sm:hidden">💝</span>
//               </Link>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsVisible(false)}
//               className="h-8 w-8 p-0 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
