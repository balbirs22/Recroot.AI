"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React from "react";

function PayButton({ amount, credits }) {
  const { user } = useUser();

  const onPaymentSuccess = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: (user?.credits || 0) + credits })
      .eq("email", user?.email);

    if (error) {
      toast.error("Failed to update credits!");
      return;
    }

    toast.success("Successfully added credits!");
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer">
          Purchase Credits
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Proceed to Pay</DialogTitle>
          <DialogDescription asChild>
            <div className="paypal-container w-full max-w-xs mx-auto scale-95">
              <PayPalButtons
                style={{ layout: "vertical" }}
                forceReRender={[amount]}
                createOrder={(data, actions) =>
                  actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount,
                          currency_code: "USD",
                        },
                      },
                    ],
                  })
                }
                onApprove={() => onPaymentSuccess()}
                onCancel={() => toast("Payment Canceled")}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PayButton;
