-- CreateTable
CREATE TABLE "TokenPriceHistory" (
    "id" SERIAL NOT NULL,
    "priceInWei" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aiTokenId" INTEGER NOT NULL,

    CONSTRAINT "TokenPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenPriceHistory_aiTokenId_timestamp_idx" ON "TokenPriceHistory"("aiTokenId", "timestamp");

-- AddForeignKey
ALTER TABLE "TokenPriceHistory" ADD CONSTRAINT "TokenPriceHistory_aiTokenId_fkey" FOREIGN KEY ("aiTokenId") REFERENCES "AIToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
