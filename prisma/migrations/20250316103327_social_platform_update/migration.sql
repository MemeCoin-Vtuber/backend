/*
  Warnings:

  - You are about to drop the `SocialPlatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialPlatformToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialPlatformToken" DROP CONSTRAINT "SocialPlatformToken_aiTokenId_fkey";

-- DropForeignKey
ALTER TABLE "SocialPlatformToken" DROP CONSTRAINT "SocialPlatformToken_socialPlatformId_fkey";

-- AlterTable
ALTER TABLE "AIToken" ADD COLUMN     "Discord" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "SocialPlatform";

-- DropTable
DROP TABLE "SocialPlatformToken";
