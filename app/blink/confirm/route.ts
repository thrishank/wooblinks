import { decryptApiKey } from "@/lib/encrypt";
import { PrismaClient } from "@prisma/client";
import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import { verifyTx } from "./verifyTx";
import { createPaidOrder } from "@/lib/paid-order";
const headers = createActionHeaders();
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

interface dataType {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
  product_id: string;
  consumerKey: string;
  consumerSecret: string;
}

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const data: dataType = JSON.parse(url.searchParams.get("data")!);
    const id = url.searchParams.get("id")!;

    const db_data = await prisma.blink.findUnique({
      where: { id },
    });

    const body: NextActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    let signature: string;
    try {
      //@ts-ignore
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }

    const { success, error } = await verifyTx(
      signature,
      account.toBase58(),
      db_data?.walletAddress!,
      db_data?.price!
    );

    if (success === false) {
      const payload: CompletedAction = {
        icon: new URL("/error.png", url.origin).toString(),
        title: "Payment Failed",
        description:
          error! +
          "If you have done a valid transaction please contact support",
        label: "Failed",
        type: "completed",
      };

      return Response.json(payload, {
        headers,
      });
    }

    const createdorder = createPaidOrder(
      data.first_name,
      data.last_name,
      data.address,
      data.city,
      data.state,
      data.postcode,
      data.country,
      data.email,
      data.phone,
      db_data?.product_id!,
      //@ts-ignore
      db_data?.consumerKey,
      //@ts-ignore
      db_data.consumerSecret,
      db_data?.wooUrl,
      db_data?.price
    );
    
    const payload: CompletedAction = {
      type: "completed",
      title: "Order Created Successfully",
      icon: "https://i.sstatic.net/YbIni.png",
      label: "Complete!",
      description: `Your order has been created successfully. Please check your email for confirmation.`,
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    // const actionError: ActionError = {
    //   message: err instanceof Error ? err.message : "An unknown error occurred",
    // };
    // return Response.json(actionError, { status: 400, headers });
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};
