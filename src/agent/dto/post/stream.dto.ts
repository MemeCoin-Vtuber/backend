import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";


export class AgentStreamDetails {

    @IsInt()
    @ApiPropertyOptional({
        description: 'Token ID',
        example: 1
    })
    aiTokenId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Go to youtube settings and get your channel id",
        example: "Quza...."
    })
    youtubeChannelId: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Go to your twitch settings and get your channel id",
        example: "tsa...."
    })
    twitchChannelId: string;

}