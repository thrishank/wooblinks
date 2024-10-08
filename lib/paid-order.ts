import { Buffer } from "buffer";
import axios from "axios";
export const createPaidOrder = async (
  first_name: string,
  last_name: string,
  address: string,
  city: string,
  state: string,
  postcode: string,
  country: string,
  email: string,
  phone: string,
  product_id: string,
  username: string,
  password: string,
  wooUrl: string,
  price: number
) => {
  try {
    const basicAuthString = Buffer.from(
      `${username}:${password}`,
      "utf-8"
    ).toString("base64");

    const data = {
      payment_method: "bacs",
      payment_method_title: "Crypto USDC Payment",
      set_paid: true,
      billing: {
        first_name: first_name,
        last_name: last_name,
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        email: email,
        phone: phone,
      },
      shipping: {
        first_name: first_name,
        last_name: last_name,
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: postcode,
        country: country,
      },
      line_items: [
        {
          product_id: product_id,
          quantity: 1,
        },
      ],
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Crypto USDC Payment",
          total: price,
        },
      ],
    };
    //      const response = await axios.post('https://woo-swiftly-spooky-koala.wpcomstaging.com/wp-json/wc/v3/orders', data, {
    const response = await axios.post(`${wooUrl}/wp-json/wc/v3/orders`, data, {
      headers: {
        Authorization: `Basic ${basicAuthString}`,
      },
    });

    console.log(response.data);
    return response.data; // Return the created order data
  } catch (error) {
    console.log("Error creating order:", error);
    throw error; // Throw error if there's an issue creating the order
  }
};
