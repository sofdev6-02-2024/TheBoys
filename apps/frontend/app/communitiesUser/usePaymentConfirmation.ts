import { useState } from "react";

// Hook para manejar la confirmación del pago
function usePaymentConfirmation() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(true);

  const confirmPayment = () => {
    
    setPaymentConfirmed(true);
    console.log("EL PAGO ESTA : "+paymentConfirmed);
  };

  const resetPaymentConfirmation = () => {
    setPaymentConfirmed(false);
    console.log("EL PAGO ESTA : "+paymentConfirmed);
  };

  return {
    paymentConfirmed,
    confirmPayment,
    resetPaymentConfirmation,
  };
}

export default usePaymentConfirmation;
