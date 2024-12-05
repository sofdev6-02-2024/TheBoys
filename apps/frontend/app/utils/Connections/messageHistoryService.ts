import axios from "axios";

const API_BASE_URL = "http://localhost:4444/messageHistory";

export class MessageHistoryService {

  static async fetchCommunityMessages(communityId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/${communityId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching community messages:", error);
      throw error;
    }
  }


  static async sendMessage(data: {
    userName: string;
    userId: string;
    communityId: string;
    message: string;
  }) {
    try {
      await axios.post(API_BASE_URL, data);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}
