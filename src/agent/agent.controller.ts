import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiTokenDto } from './dto/post/aiToken.dto';
import { AgentService } from './agent.service';
import { CurrentUser } from 'src/decorators';
import { AgentCharacterDto } from './dto/post/agentCharacter.dto';
import { AgentPersonalityDto } from './dto/post/personality.dto';
import { AgentSocialPlatformDto } from './dto/post/socialPlatform.dto';
import { GetAgentsDto } from './dto/get/agents.dto';
import { AgentStreamDetails } from './dto/post/stream.dto';

@Controller('agent')
export class AgentController {

    constructor(private agentSerivce: AgentService, private prismaService: PrismaService) {}

    async checkUserOwnsAgent(agentTokenId: number, userId: number) { 

        const token = await this.prismaService.aIToken.findFirst({
            where: {
                id: agentTokenId,
                userId: userId
            }
        })

        if (!token) {
            throw new NotFoundException("Token Not found");
        }

    }

    @Post("create-token")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async createToken(@Body() aiTokenDto: AiTokenDto, @CurrentUser() user) {

        return this.agentSerivce.createToken(
            user.userId as number,
            aiTokenDto.tokenName,
            aiTokenDto.symbol,
            aiTokenDto.tokenDescription,
            aiTokenDto.tokenImageUrl,
            aiTokenDto.supply,
            aiTokenDto.contractAddress
        )

    }

    @Post("add-agent-character")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async addAgentCharacter(@Body() agentCharacterDto: AgentCharacterDto, @CurrentUser() user) {

        await this.checkUserOwnsAgent(agentCharacterDto.aiTokenId, user.userId as number)

        return this.agentSerivce.addAgentCharacter(
            user.userId as number,
            agentCharacterDto.agentName,
            agentCharacterDto.agentIpfsUrl,
            agentCharacterDto.agentImageUrl
        )

    }

    @Post("add-agent-personality")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async addAgentPersonality(@Body() agentPersonalityDto: AgentPersonalityDto, @CurrentUser() user) {

        await this.checkUserOwnsAgent(agentPersonalityDto.aiTokenId, user.userId as number)

        return this.agentSerivce.addPersonality(
            user.userId as number,
            agentPersonalityDto.voiceType,
            agentPersonalityDto.personalityType
        )

    }

    @Post("add-agent-social-platforms")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async addAgentSocialPlatform(@Body() agentSocialPlatformDto: AgentSocialPlatformDto, @CurrentUser() user) {

        await this.checkUserOwnsAgent(agentSocialPlatformDto.aiTokenId, user.userId as number)

        return this.agentSerivce.addSocialPlatform(
            user.userId as number,
            agentSocialPlatformDto.website,
            agentSocialPlatformDto.twitter,
            agentSocialPlatformDto.telegram,
            agentSocialPlatformDto.discord,
            agentSocialPlatformDto.youtube
        )

    }

    @Post("add-agent-stream-details")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async addStreamDetails(@Body() agentStreamDetailsDto: AgentStreamDetails, @CurrentUser() user) {

        await this.checkUserOwnsAgent(agentStreamDetailsDto.aiTokenId, user.userId as number)

        return this.agentSerivce.addStreamDetails(
            user.userId as number,
            agentStreamDetailsDto.youtubeChannelId,
            agentStreamDetailsDto.twitchChannelId
        )

    }

    @Get("")
    async getAgents(@Query() filters: GetAgentsDto) {
        return this.agentSerivce.getAgents(filters)
    }

    @Get(":id")
    async getAgent(@Param("id", ParseIntPipe) id: number) {
        return this.agentSerivce.getAgent(id)
    }

}
