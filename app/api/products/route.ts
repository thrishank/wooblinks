import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const consumerKey = session?.user.consumerKey;
  const consumerSecret = session?.user.consumerSecret;
  const wooEcomWebsiteUrl = session?.user.wooEcomWebsiteUrl;
  const url = `${wooEcomWebsiteUrl}/wp-json/wc/v3/products`;
  const basicAuthString = Buffer.from(`${consumerKey}:${consumerSecret}`, 'utf-8').toString('base64');

  try {

console.log('rey ,',wooEcomWebsiteUrl,consumerKey,consumerSecret)    // Make the request to WooCommerce API
    const res = await axios.get(url, {
      headers: {
        Authorization: `Basic ${basicAuthString}`,
        "Content-Type": "application/json",
      },
    });
  console.log('pubkcasd ',res.data)
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
