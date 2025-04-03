/*
  Warnings:

  - Added the required column `updatedAt` to the `AIToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIToken" ADD COLUMN     "contractAddress" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Personality" (
    "id" SERIAL NOT NULL,
    "aiPersonalityImageUrl" TEXT NOT NULL,
    "aiPersonality" TEXT NOT NULL,
    "aiPersonalityDescription" TEXT NOT NULL,
    "aiPersonalityVoice" TEXT,
    "aiPersonalityType" TEXT,
    "aiTokenId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPlatform" (
    "id" SERIAL NOT NULL,
    "platformType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPlatformToken" (
    "id" SERIAL NOT NULL,
    "aiTokenId" INTEGER NOT NULL,
    "socialPlatformId" INTEGER NOT NULL,
    "username" TEXT,
    "emailId" TEXT,
    "password" TEXT,
    "knowledgeBase" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialPlatformToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentDisplay" (
    "id" SERIAL NOT NULL,
    "agentImageUrl" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "agentIpfsUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentDisplay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamDetails" (
    "id" SERIAL NOT NULL,
    "youtubeStreamKey" TEXT,
    "twitchStreamKey" TEXT,
    "aiTokenId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personality_aiTokenId_key" ON "Personality"("aiTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPlatformToken_aiTokenId_socialPlatformId_key" ON "SocialPlatformToken"("aiTokenId", "socialPlatformId");

-- CreateIndex
CREATE UNIQUE INDEX "StreamDetails_aiTokenId_key" ON "StreamDetails"("aiTokenId");

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_aiTokenId_fkey" FOREIGN KEY ("aiTokenId") REFERENCES "AIToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialPlatformToken" ADD CONSTRAINT "SocialPlatformToken_aiTokenId_fkey" FOREIGN KEY ("aiTokenId") REFERENCES "AIToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialPlatformToken" ADD CONSTRAINT "SocialPlatformToken_socialPlatformId_fkey" FOREIGN KEY ("socialPlatformId") REFERENCES "SocialPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamDetails" ADD CONSTRAINT "StreamDetails_aiTokenId_fkey" FOREIGN KEY ("aiTokenId") REFERENCES "AIToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
