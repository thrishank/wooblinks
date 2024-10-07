-- CreateTable
CREATE TABLE "Blink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "consumerSecret" TEXT NOT NULL,
    "consumerKey" TEXT NOT NULL,
    "wooUrl" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blink_pkey" PRIMARY KEY ("id")
);
