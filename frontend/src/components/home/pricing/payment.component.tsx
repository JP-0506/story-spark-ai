import React from "react";
import { Link } from "react-router-dom";

const PaymentComponent = () => {
  return (
    <div className="bg-royal-blue flex-col items-center justify-center px-4">
      <h1 className="justify-center text-2xl font-bold">Complete Your Subscription</h1>
      <div className="bg-grey-800">
        <form className="rounded shadow-md space-y-5">
          <div>
            <label className="card">Card Details</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="cardNum rounded bg-slate-700" />
          </div>
          <button type="button" className="PayButton rounded font-bold hover:bg-violet-700">
            Pay Now
          </button>
        </form>
        <Link to="/pricing" className="PricingB text-center hover:underline">
          Back to Pricing
        </Link>
      </div>
    </div>
  );
};

export default PaymentComponent;