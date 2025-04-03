import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";


export class AgentCharacterDto {

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Token Id",
        example: 1
    })
    aiTokenId: number;

    @IsString()
    @ApiPropertyOptional({
        description: 'Agent Image Url',
        example: "https://agentimagurl.png"
    })
    agentImageUrl: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Hiori"
    })
    agentName: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "IPfs url of agent live2d model file",
        example: "ipfs://askldjiopdwekdjad"
    })
    agentIpfsUrl: string;

}