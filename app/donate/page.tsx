"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Heart,
  Coffee,
  Star,
  PointerIcon as SidebarTrigger,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donationAmounts = [
  // { amount: 25, label: "₹25", description: "Buy us a coffee" },
  // { amount: 50, label: "₹50", description: "Support hosting for a week" },
  { amount: 100, label: "₹100", description: "Buy us a coffee" },
  { amount: 500, label: "₹500", description: "Support hosting for a week" },
  { amount: 1000, label: "₹1000", description: "Fund AI improvements" },
  { amount: 2500, label: "₹2500", description: "Premium features development" },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const { toast } = useToast();

  // const handleDonate = () => {
  //   const amount = selectedAmount || Number.parseInt(customAmount)

  //   if (!amount || amount < 10) {
  //     toast({
  //       title: "Invalid amount",
  //       description: "Please enter an amount of at least ₹10.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   // In a real app, this would integrate with Razorpay
  //   toast({
  //     title: "Thank you for your support! 🙏",
  //     description: `Donation of ₹${amount} will be processed. Razorpay integration coming soon!`,
  //   })
  // }

  const handleDonate = async () => {
    const amount = selectedAmount || Number.parseInt(customAmount);

    if (!amount || amount < 10) {
      toast({
        title: "Invalid amount",
        description: "Please enter an amount of at least ₹10.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const order = await res.json();

      if (!order.id) throw new Error("Failed to create order");

      if (typeof window === "undefined" || !window.Razorpay) {
        toast({
          title: "Payment error",
          description: "Razorpay SDK not loaded",
          variant: "destructive",
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // frontend key
        amount: order.amount,
        currency: order.currency,
        name: "Namveda",
        description: "Donation",
        order_id: order.id,
        handler(response: any) {
          toast({
            title: "Thank you for your support! 🙏",
            description: `Payment successful! Payment ID: ${response.razorpay_payment_id}`,
          });
        },
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: { color: "#a855f7" }, // optional: purple
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Unable to process the donation right now.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold">Support Namveda</h1>
          <p className="text-muted-foreground">
            Help us keep the name generator free and continuously improving
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Make a Donation
            </CardTitle>
            <CardDescription>
              Your contribution helps us maintain servers, improve AI models,
              and add new features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preset Amounts */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Choose Amount</Label>
              <div className="grid grid-cols-2 gap-3">
                {donationAmounts.map((donation) => (
                  <Card
                    key={donation.amount}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedAmount === donation.amount
                        ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedAmount(donation.amount);
                      setCustomAmount("");
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-bold">{donation.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {donation.description}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="customAmount" className="text-sm font-medium">
                Or enter custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter amount"
                  className="pl-8"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Donor Information (Optional)
              </Label>
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Donate{" "}
              {selectedAmount
                ? `₹${selectedAmount}`
                : customAmount
                ? `₹${customAmount}`
                : ""}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Secure payment powered by Razorpay
            </p>
          </CardContent>
        </Card>

        {/* Why Support Us */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Why Support Us?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Star className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Keep it Free</h4>
                  <p className="text-sm text-muted-foreground">
                    Your donations help us keep Namveda completely free for all
                    users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Coffee className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Better AI Models</h4>
                  <p className="text-sm text-muted-foreground">
                    Fund upgrades to more powerful AI models for better name
                    suggestions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Gift className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">New Features</h4>
                  <p className="text-sm text-muted-foreground">
                    Support development of new features like name history,
                    sharing, and more
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Recent Supporters</CardTitle>
              <CardDescription>
                Thank you to our amazing community!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anonymous</span>
                  <Badge variant="secondary">₹500</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Priya S.</span>
                  <Badge variant="secondary">₹1000</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rahul M.</span>
                  <Badge variant="secondary">₹250</Badge>
                </div>
                <div className="text-center pt-2">
                  <p className="text-xs text-muted-foreground">
                    Join our list of supporters! 🙏
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
