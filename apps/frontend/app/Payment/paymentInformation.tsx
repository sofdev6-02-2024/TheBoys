import Image from "next/image";

export interface Props {
  name: string;
  description: string;
  amount: number;
  image_url: string;
  currency: string;
}

function PaymentInformation({
  name,
  description,
  amount,
  image_url,
  currency,
}: Props) {
  return (
    <section className="flex flex-col items-center gap-2">
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="font-semibold text-2xl">
        {currency.toUpperCase()} {amount * 100}
      </p>
      <Image
        alt={name}
        src={image_url}
        width={150}
        height={150}
        className="rounded-full"
      />
      <p className="text-center">{description}</p>
    </section>
  );
}

export default PaymentInformation;
