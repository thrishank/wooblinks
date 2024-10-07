import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      consumerKey: string;
      consumerSecret: string;
      wooEcomWebsiteUrl: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    consumerKey: string;
    consumerSecret: string;
    wooEcomWebsiteUrl: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    consumerKey: string;
    consumerSecret: string;
    wooEcomWebsiteUrl: string;
  }
}
