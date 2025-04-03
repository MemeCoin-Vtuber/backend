import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";


export class AgentSocialPlatformDto {

    @IsInt()
    @ApiPropertyOptional({
        description: 'Token ID',
        example: 1
    })
    aiTokenId: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "https://shilltube.fun"
    })
    website: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Twitter Username",
        example: "shilltube"
    })
    twitter: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Telegram Username",
        example: "shilltube"
    })
    telegram: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "discord username",
        example: "shilltube"
    })
    discord: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Youtube Username",
        example: "shilltube"
    })
    youtube: string


}