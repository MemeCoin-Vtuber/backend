/*
  Warnings:

  - You are about to drop the `Personality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Personality" DROP CONSTRAINT "Personality_aiTokenId_fkey";

-- DropTable
DROP TABLE "Personality";

-- CreateTable
CREATE TABLE "AgentDisplayTemplate" (
    "id" SERIAL NOT NULL,
    "agentImageUrl" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "agentIpfsUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentDisplayTemplate_pkey" PRIMARY KEY ("id")
);
