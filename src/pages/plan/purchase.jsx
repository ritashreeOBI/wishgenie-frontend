import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Plan/Purchase/CheckoutForm";
import { STRIPE_CREATE_INTENT, STRIPE_CREATE_INTENT_FOR_PLAN } from "@/api/Api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Purchase = () => {
  const { planList, isLoading, selectedPlan } = useSelector(
    (state) => state.planSlice
  );
  const { user } = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const [clientSecret, setClientSecret] = React.useState("");
  React.useEffect(() => {
    if (Object.keys(selectedPlan).length > 0) {
      try {
        // Create PaymentIntent as soon as the page loads
        axios(STRIPE_CREATE_INTENT_FOR_PLAN, {
          method: "POST",
          data: {
            plan: selectedPlan,
            userId: user.userId,
          },
        }).then((response) => {
          console.log("response", response);
          setClientSecret(response.data.clientSecret);
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      router.push("/");
    }
  }, []);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="mt-32  min-h-[500px] mb-4 mx-0 sm:mx-4 md:mx-8  py-2 bg-slate-50 rounded-xl p-3">
      <div className="bg-slate-50 pr-4 rounded-sm">
        <div className="flex border-b py-3 text-2xl text-slate-700 font-semibold pl-4">
          <div className="w-[300px]">
            <p className="text-[18px] mb-[8px]">Plan - {selectedPlan.title}</p>
            <p className="text-sm mb-[8px]">No. of Images -{selectedPlan.noOfImages}</p>
            <p className="text-sm mb-[8px]">Price - ${selectedPlan.price}</p>
            <p className="text-sm mb-[8px]">Discount -{selectedPlan.discount}</p>
            <p className="text-[18px] mb-[8px]">
              Total Price -${selectedPlan.price - selectedPlan.discount}
            </p>
          </div>
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

export default Purchase;
