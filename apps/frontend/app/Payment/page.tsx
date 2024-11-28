"use client";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';
import React from 'react';

const stripePromise = loadStripe('pk_test_51QQCh2GIlJLQuhTc9b6gobE4K6HY0EtAO77b1E9FDbULaMl8mD9Rps43XcyYLntkpJ9X6ooHrpgv64EwxOzk0pnS00inTsfCMU');

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentPage;
