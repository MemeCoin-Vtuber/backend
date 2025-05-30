import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAgentsDto } from './dto/get/agents.dto';

@Injectable()
export class AgentService {
  constructor(private prismaService: PrismaService) {}

  async checkTokenExists(aiTokenId: number) {
    const token = await this.prismaService.aIToken.findUnique({
      where: {
        id: aiTokenId,
      },
    });

    if (!token) {
      throw new NotFoundException('Token not found!');
    }
  }

  async createToken(
    walletAddress: string,
    tokenName: string,
    symbol: string,
    tokenDescription: string,
    tokenImageUrl: string,
    supply: number,
    contractAddress: string,
    website: string,
    twitter: string,
    telegram: string,
    discord: string,
    youtube: string,
    youtubeChannelId: string,
    twitchChannelId: string,
  ) {
    console.log(walletAddress);
    const user = await this.prismaService.user.findFirst({
      where: {
        walletAddress: walletAddress,
      },
    });
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const agentCharacter = await this.prismaService.aIToken.create({
      data: {
        tokenName,
        symbol,
        tokenDescription,
        tokenImageUrl,
        supply,
        contractAddress,
        website,
        twitter,
        telegram,
        discord,
        youtube,
        youtubeChannelId,
        twitchChannelId,
        userId: user.id,
      },
    });

    return agentCharacter;
  }

  async addAgentCharacter(
    aiTokenId: number,
    agentName: string,
    agentIpfsUrl: string,
    agentImageUrl: string,
  ) {
    await this.checkTokenExists(aiTokenId);

    try {
      const agentCharacter = await this.prismaService.agentDisplay.create({
        data: {
          agentImageUrl,
          agentIpfsUrl,
          agentName,
          aiTokenId,
        },
      });
      return agentCharacter;
    } catch {
      throw new BadRequestException('Agent info already exists');
    }
  }

  async addPersonality(
    aiTokenId: number,
    voiceType: string,
    personalityType: string[],
  ) {
    await this.checkTokenExists(aiTokenId);

    const agentPersonality = await this.prismaService.aIToken.update({
      where: { id: aiTokenId },
      data: {
        voiceType,
        personalityType,
      },
    });
    return agentPersonality;
  }

  // Get API [multiple responses]
  async getAgents(filters: GetAgentsDto) {
    const skip = ((filters.page || 0) - 1) * (filters.pageSize || 0);

    const results = await this.prismaService.aIToken.findMany({
      where: {
        ...(filters.walletAddress && filters.walletAddress !== ''
          ? { user: { walletAddress: filters.walletAddress } }
          : {}),
        tokenName: filters.tokenName
          ? { contains: filters.tokenName, mode: 'insensitive' }
          : undefined,
        tokenDescription: filters.tokenDescription
          ? { contains: filters.tokenDescription, mode: 'insensitive' }
          : undefined,
      },
      skip: skip,
      take: filters.pageSize || 0,
      select: {
        id: true,
        tokenName: true,
        symbol: true,
        tokenDescription: true,
        tokenImageUrl: true,
        contractAddress: true,
        personalityType: true,
      },
      orderBy: {
        createdAt: 'desc', // Order by latest created date
      },
    });

    return results;
  }

  // Show agent detail
  async getAgent(id: number) {
    const token = await this.prismaService.aIToken.findUnique({
      where: {
        id,
      },
      include: {
        agentDisplay: true,
        user: {
          select: {
            username: true,
            walletAddress: true,
            profile_pic: true,
            createdAt: true,
          },
        },
      },
    });

    return token;
  }

  async getAgentTemplates() {
    const templates = await this.prismaService.agentDisplayTemplate.findMany();
    return templates;
  }
}