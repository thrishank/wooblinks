import axios from "axios";


interface ShopifyShop {
  id: string;
}

export async function verifyTokenAndGetShopInfo(
  token: string,
  url: string
): Promise<ShopifyShop> {
  const apiUrl = `${url}/admin/api/2023-04/shop.json`;

  try {
    const response = await axios.get<{ shop: ShopifyShop }>(apiUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    });

    return response.data.shop;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `HTTP error! status: ${error.response?.status}, message: ${error.message}`
      );
    }
    throw new Error(
      `Failed to verify token: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
