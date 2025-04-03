/*
  Warnings:

  - You are about to drop the column `Discord` on the `AIToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AIToken" DROP COLUMN "Discord",
ADD COLUMN     "discord" TEXT;
