import axios from "axios";
import { IntentDto, PaymentItemDto } from "../types";

const BASE_URL = "http://localhost:4444";

export const createIntent = async (payload: IntentDto) => {
  axios.post(`${BASE_URL}/payments`, payload);
};

export const getPaymentToken = async (payload: PaymentItemDto) => {
  axios.post(`${BASE_URL}/payments/wrap-data`, payload);
};
