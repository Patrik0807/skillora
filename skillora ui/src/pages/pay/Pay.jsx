 import React, { useEffect, useState } from "react";
 import "./Pay.scss";
 import { loadStripe } from "@stripe/stripe-js";
 import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
 import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

  const stripePromise = loadStripe(
    "pk_test_51RfEkLCN0LtfiFfB55xI773WZ5zX2zPjSH5CmwkSxz5qUqXl9jln96hal9E7nweTXV4ZtngHIMueGBa6xL4iVKcr00BAInYzXl"
  );

const Pay = () => {
 const [clientSecret, setClientSecret] = useState("");

   const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
  {clientSecret && (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )}
</div>

 };

 export default Pay;



