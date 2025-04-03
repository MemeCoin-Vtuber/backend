/*
  Warnings:

  - You are about to drop the column `twitchStreamKey` on the `StreamDetails` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeStreamKey` on the `StreamDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StreamDetails" DROP COLUMN "twitchStreamKey",
DROP COLUMN "youtubeStreamKey",
ADD COLUMN     "twitchChannelId" TEXT,
ADD COLUMN     "youtubeChannelId" TEXT;
