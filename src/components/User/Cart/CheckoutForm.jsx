import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { STRIPE_UPDATE_PAYMENT_STATUS } from "@/api/Api";
import axios from "axios";
import Router from "next/router";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    // if (!clientSecret) {
    //   return;
    // }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log("paymentIntent", paymentIntent);
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        // case "requires_payment_method":
        //   setMessage("Your payment was not successful, please try again.");
        //   break;
        default:
          //   setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/cart/payment-success",
      },
      redirect: "if_required",
    });
    console.log("response", response);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (
    //   response.error.type === "card_error" ||
    //   response.error.type === "validation_error"
    // ) {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }
    // console.log("response.paymentIntent.status", response);
    if (response?.paymentIntent?.status == "succeeded") {
      console.log("kkkkkkkkkkkk");
      const { currency, id, status, amount } = response.paymentIntent;

      try {
        // Create PaymentIntent as soon as the page loads
        let updateResponse = await axios(STRIPE_UPDATE_PAYMENT_STATUS, {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          data: {
            currency,
            paymentId: id,
            status,
            amount,
            userId: 18,
            artWallUserId: 24,
          },
        });
        if (updateResponse.status === 200) {
          Router.push(updateResponse.data.redirect_url);
        }
        console.log("updateResponse", updateResponse);
      } catch (error) {
        alert(error.message);
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="my-4 bg-admin-primary text-white rounded-sm px-[110px] py-3 uppercase text-xs"
      >
        {isLoading ? "Please wait..." : "Pay now"}
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
