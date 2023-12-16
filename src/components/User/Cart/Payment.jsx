import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { STRIPE_CREATE_INTENT } from "@/api/Api";
import axios from "axios";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    try {
      // Create PaymentIntent as soon as the page loads
      axios(STRIPE_CREATE_INTENT, {
        method: "POST",
        data: {
          items: [{ id: "xl-tshirt", qty: 1, id: "round-tee", qty: 2 }],
          artWallUserId: 24,
        },
      }).then((response) => {
        console.log("response", response);
        setClientSecret(response.data.clientSecret);
      });
    } catch (error) {
      alert(error.message);
    }
  }, []);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  console.log("clientSecret", clientSecret);
  return (
    <div className="mb-4 mx-0 sm:mx-4 md:mx-8  py-2 bg-slate-50 rounded-xl p-3">
      <div className="bg-slate-50 w-[320px] pr-4 rounded-sm">
        <div className="flex border-b py-3 text-2xl text-slate-700 font-semibold pl-4">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
