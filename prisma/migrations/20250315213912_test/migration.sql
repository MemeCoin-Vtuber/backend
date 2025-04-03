/*
  Warnings:

  - A unique constraint covering the columns `[aiTokenId]` on the table `AgentDisplay` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aiTokenId` to the `AgentDisplay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIToken" ADD COLUMN     "agentDisplayId" INTEGER;

-- AlterTable
ALTER TABLE "AgentDisplay" ADD COLUMN     "aiTokenId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AgentDisplay_aiTokenId_key" ON "AgentDisplay"("aiTokenId");

-- AddForeignKey
ALTER TABLE "AgentDisplay" ADD CONSTRAINT "AgentDisplay_aiTokenId_fkey" FOREIGN KEY ("aiTokenId") REFERENCES "AIToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
