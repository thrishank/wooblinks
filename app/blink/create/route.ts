import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    const consumerKey = session?.user.consumerKey;
    const consumerSecret = session?.user.consumerSecret;
    const wooEcomWebsiteUrl = session?.user.wooEcomWebsiteUrl;
    const url = `${wooEcomWebsiteUrl}`;

    const body = await req.json();
    const { title, description, image, price, walletAddress, product_id,updated_price } = body;

    const blink = await prisma.blink.create({
      data: {
        title,
        description,
        image,
        price: updated_price,
        walletAddress,
        consumerSecret: consumerSecret!,
        consumerKey: consumerKey!,
        wooUrl : url!,
        product_id: product_id.toString(),
      },
    });

    return NextResponse.json(blink.id, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "error creating the blink" },
      { status: 500 }
    );
  }
}
