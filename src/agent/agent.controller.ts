import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiTokenDto } from './dto/post/aiToken.dto';
import { AgentService } from './agent.service';
import { CurrentUser } from 'src/decorators';
import { AgentCharacterDto } from './dto/post/agentCharacter.dto';
import { AgentPersonalityDto } from './dto/post/personality.dto';
import { GetAgentsDto } from './dto/get/agents.dto';
import { GetUser } from 'src/auth/privy-decorator';
import { PrivyAuthGuard } from 'src/auth/privy-auth-guard';

@Controller('agent')
export class AgentController {
  constructor(
    private agentSerivce: AgentService,
    private prismaService: PrismaService,
  ) {}

  async checkUserOwnsAgent(agentTokenId: number, userId: number) {
    const token = await this.prismaService.aIToken.findFirst({
      where: {
        id: agentTokenId,
        userId: userId,
      },
    });

    if (token === null) {
      throw new NotFoundException('Token Not found');
    }
  }

  @Post('create-token')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  async createToken(@Body() aiTokenDto: AiTokenDto, @GetUser user: any) {
    console.log(user);
    return this.agentSerivce.createToken(
      user.wallet.address as string,
      aiTokenDto.tokenName,
      aiTokenDto.symbol,
      aiTokenDto.tokenDescription,
      aiTokenDto.tokenImageUrl,
      aiTokenDto.supply,
      aiTokenDto.contractAddress,
      aiTokenDto.website,
      aiTokenDto.twitter,
      aiTokenDto.telegram,
      aiTokenDto.discord,
      aiTokenDto.youtube,
      aiTokenDto.youtubeChannelId,
      aiTokenDto.twitchChannelId,
    );
  }

  @Post('add-token-character')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  async addAgentCharacter(
    @Body() agentCharacterDto: AgentCharacterDto,
    @GetUser user,
  ) {
    await this.checkUserOwnsAgent(
      agentCharacterDto.aiTokenId,
      user.userId as number,
    );

    return this.agentSerivce.addAgentCharacter(
      agentCharacterDto.aiTokenId,
      agentCharacterDto.agentName,
      agentCharacterDto.agentIpfsUrl,
      agentCharacterDto.agentImageUrl,
    );
  }

  @Post('add-token-personality')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  async addAgentPersonality(
    @Body() agentPersonalityDto: AgentPersonalityDto,
    @GetUser user,
  ) {
    await this.checkUserOwnsAgent(
      agentPersonalityDto.aiTokenId,
      user.userId as number,
    );

    return this.agentSerivce.addPersonality(
      agentPersonalityDto.aiTokenId,
      agentPersonalityDto.voiceType,
      agentPersonalityDto.personalityType,
    );
  }

  @Post('add-token-contract')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  async addContract(
    @Body() agentContract: {aiTokenId: number, contractAddress: string},
    @GetUser user,
  ) {
    await this.checkUserOwnsAgent(
      agentContract.aiTokenId,
      user.userId as number,
    );

    const updatedUser = await this.prismaService.aIToken.update({
      where: {
        id: agentContract.aiTokenId
      },
      data: {
        contractAddress: agentContract.contractAddress
      }
    })

    return updatedUser
  }

  @Get('')
  async getAgents(@Query() filters: GetAgentsDto) {
    return this.agentSerivce.getAgents(filters);
  }

  @Get('templates')
  async getAgentTemplates() {
    return this.agentSerivce.getAgentTemplates();
  }

  @Get(':id')
  async getAgent(@Param('id', ParseIntPipe) id: number) {
    return this.agentSerivce.getAgent(id);
  }
}