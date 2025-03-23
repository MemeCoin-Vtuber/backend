/*
  Warnings:

  - You are about to drop the `StreamDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StreamDetails" DROP CONSTRAINT "StreamDetails_aiTokenId_fkey";

-- AlterTable
ALTER TABLE "AIToken" ADD COLUMN     "twitchChannelId" TEXT,
ADD COLUMN     "youtubeChannelId" TEXT;

-- DropTable
DROP TABLE "StreamDetails";
