import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/lib/products";
import { Card, CardContent, CardFooter } from "@/components/common/card";
import { Button } from "@/components/common/button";

interface ProductCardProps {
  product: Product;
  onGenerateBlink: (product: Product) => void;
  currency_rate: string;
}

const extractTextFromHTML = (htmlString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const pTag = doc.querySelector('p');
  return pTag ? pTag.textContent || '' : ''; // Return the text content of the <p> tag
};
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onGenerateBlink,
  currency_rate,
}) => {
  const descriptionText = extractTextFromHTML(product.description);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
      {product.images.length>0 && (
        <Image
          src={product.images[0].src}
          alt={ product.images[0].name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
           <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">s{descriptionText}</p>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4 mt-auto">
        <Button
          onClick={() => onGenerateBlink(product)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Generate Blink
        </Button>
      </CardFooter>
    </Card>
  );
};
