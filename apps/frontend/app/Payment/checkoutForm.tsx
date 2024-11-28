"use client"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { toast } from 'sonner';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements?.getElement(CardNumberElement);
    if (!stripe || !elements || !cardElement) {
      toast.error('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    const { error: cardError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

    if (cardError) {
      toast.error(cardError.message || 'An error occurred while creating the payment method.');
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;
    try {
      const response = await fetch('http://localhost:3000/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          amount: 1000, // Amount in cents
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      console.log(data);
      cardElement.clear();
      toast.success('Payment successful! 🎉');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      console.error(error);
    }

    setLoading(false);
  };

  const handleCardNumberChange = (event: { complete: boolean }) =>
    setCardNumberComplete(event.complete);
  const handleExpiryChange = (event: { complete: boolean }) =>
    setExpiryComplete(event.complete);
  const handleCvcChange = (event: { complete: boolean }) =>
    setCvcComplete(event.complete);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <CardNumberElement
            onChange={handleCardNumberChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 sm:flex sm:space-x-4">
          <div className="mb-4 sm:mb-0 sm:w-1/2">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDate">
              Expiration Date
            </label>
            <CardExpiryElement
              onChange={handleExpiryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="sm:w-1/2">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvc">
              CVC
            </label>
            <CardCvcElement
              onChange={handleCvcChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        {loading && (
          <div className="mb-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={
                !stripe ||
                loading ||
                !(cardNumberComplete && expiryComplete && cvcComplete)
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Payment
            </button>
            {(cardNumberComplete && expiryComplete && cvcComplete) && (
              <span className="text-green-500 font-bold">Form complete</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckoutForm;
