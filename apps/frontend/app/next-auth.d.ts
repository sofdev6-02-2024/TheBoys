import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    access_token?: string;
    id_token?: string;
    roles?: string[];
    error?: string;
  }
}
