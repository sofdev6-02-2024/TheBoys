import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import Button from "../components/Button";
import PaymentInformation from "./paymentInformation";

interface Props {
  name: string;
  description: string;
  amount: number;
  image_url: string;
  currency: string;
}

function CheckoutForm({
  name,
  description,
  amount,
  image_url,
  currency,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // TODO: Successful payment page
        return_url: "http://localhost:3000/",
      },
    });


    if (result.error) {
      toast.error("A processing error occurred.");
    } else {
      toast.success("Your payment was processed");
    }
  };

  return (
    <div className="flex justify-center items-center h-full p-4 sm:p-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-primary-hover shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-full max-w-md gap-4"
      >
        <PaymentInformation
          name={name}
          description={description}
          amount={amount}
          image_url={image_url}
          currency={currency}
        />
        <PaymentElement />
        <div className="flex items-center justify-between">
          <Button
            backgroundColor="secondary"
            type="submit"
            disabled={!stripe}
            className="w-full"
          >
            Submit Payment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
