/* eslint-disable */
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkoutForm";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

const stripePromise = loadStripe(
  "pk_test_51QPq60FYtJtMV7wezKhB6hXK55IPc9EGW5zHrmq3KV0sSVoGYilVUXtkxwjgb5gvWhLqh4T1dGlb67pYkwdtQdvr001sxdImvA"
);

function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [info, setInfo] = useState({} as any);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt.verify(
          token as string,
          // TODO: add secrets to .env
          "c141d9b14f845668dca20044e725baa2fc70ed9e110c6a8ad3c454d455bf31c18ff0142bc303b6545d667128e7233602a7148758d352230a1b7065a796058261de11a595de76d3a7486240f698baf03a4b1ae1a5deaf65fab02ea33ed97b7d48ef1e9f370274c4e86ef39a2752bd8cbd0d8b4d281952fc7a77f3e620493ccf034b52364cccaa3265eb3beb419ba7a108028b588ea947ab1b0a2a4b3e0a3f4069c61fcd349c44a9000411d6d9c2b3ba2d298361f77487ca7fa2e1799d9cbe81e689d54bc93ec9a9a717306440f73f230f1a4b7466b9b1b9682a069be0287c240ff97a3d00fa37c24e5f1a5fb2b45a234d8c8415caab7d90f43fbd54c43fbb4d52"
        );
        setClientSecret(decoded.sub as string);
        setInfo(decoded);
      } catch (error) {
        toast.error(error as string)
        redirect("/not-found");
      }
    }
  }, [token]);

  if (!clientSecret) {
    return (
      <p className="flex text-center w-full font-bold justify-center">
        Loading payment...
      </p>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: { labels: "above", theme: "night" },
        clientSecret,
      }}
    >
      <CheckoutForm
        name={info.name}
        description={info.description}
        amount={info.amount}
        image_url={info.image_url}
        currency={info.currency}
      />
    </Elements>
  );
}

export default PaymentPage;
