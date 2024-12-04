// src/utils/Connections/communityService.ts

export const API_URL = "http://localhost:4444/communities";

export const updateCommunity = async (communityId: string, userId: string): Promise<void> => {
  const communityData = {
    users: [userId],
  };

  try {
    const response = await fetch(`${API_URL}/${communityId}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(communityData),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el usuario a la comunidad.");
    }

    console.log("El usuario fue agregado exitosamente a la comunidad.");
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

export const generatePayment = async (paymentData: {
  amount: number;
  currency: string;
  name: string;
  description: string;
  image_url: string;
}): Promise<string> => {
  try {
    const response = await fetch("http://localhost:4444/payments/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al generar el pago: ${errorText}`);
    }

    const textResponse = await response.text();
    console.log("Respuesta del servidor:", textResponse);

    return textResponse;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};
