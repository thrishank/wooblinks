import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { checkShopifyAccess, verifyTokenAndGetShopInfo } from "./verify";

interface User {
  id:string;
  consumerKey: string;
  consumerSecret:string
  wooEcomWebsiteUrl: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "consumer Key",
      credentials: {
        consumerKey: {
          label: "Consumer Key",
          type: "text",
          placeholder: "Enter your consumer Key",
        },
        wooEcomWebsiteUrl: {
          label: "Shopify Website URL",
          type: "text",
          placeholder: "Enter your Shopify website URL",
        },
        consumerSecret: {
          label: "Consumer Secret",
          type: "password",
          placeholder: "Enter your Consumer Secret",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const { consumerKey, wooEcomWebsiteUrl, consumerSecret } = credentials || {};
        
        if (!consumerKey || !wooEcomWebsiteUrl || !consumerSecret) {
          throw new Error("Consumer key, secret, and Shopify website URL are required");
        }
          return {
            id:consumerKey,
            consumerKey,
            consumerSecret,
            wooEcomWebsiteUrl,
          }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<any> {
      return {
        ...session,
        user: {
          id:token.consumerKey,
          consumerKey: token.consumerKey,
          consumerSecret: token.consumerSecret,
          wooEcomWebsiteUrl: token.wooEcomWebsiteUrl,
        },
      };
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
       token.id=user.id;
        token.consumerKey = user.consumerKey; 
        token.consumerSecret = user.consumerSecret;
        token.wooEcomWebsiteUrl = user.wooEcomWebsiteUrl;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/profile",
  },
};




