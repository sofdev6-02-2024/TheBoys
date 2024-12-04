import { useEffect } from "react";

function usePaymentConfirmation() {
  const getPaymentStatus = () => {
    const savedPaymentStatus = localStorage.getItem("paymentConfirmed");
    return savedPaymentStatus === "true"; 
  };

  const confirmPayment = () => {
    localStorage.setItem("paymentConfirmed", "true"); 
  };

  const resetPaymentConfirmation = () => {
    localStorage.removeItem("paymentConfirmed"); 
  };

  useEffect(() => {
    console.log("EL PAGO ESTA: " + localStorage.getItem("paymentConfirmed"));
  }, [getPaymentStatus()]);

  return {
    getPaymentStatus,
    confirmPayment,
    resetPaymentConfirmation,
  };
}

export default usePaymentConfirmation;
