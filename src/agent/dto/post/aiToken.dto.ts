import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";


export class AiTokenDto {

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        description: 'Token Name',
        example: "Hiroi"
    })
    tokenName: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        description: 'Token Symbol',
        example: "HRI"
    })
    symbol: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiPropertyOptional({
        description: 'Token Description',
        example: "Hiroi is a crypto degen and a short tempered female."
    })
    tokenDescription: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        description: 'Token Image URL',
        example: "https://tokenurl.png"
    })
    tokenImageUrl: string;

    @IsInt()
    @Min(1)
    @ApiPropertyOptional({
        description: 'Total Token Supply',
        example: 10000
    })
    supply: number

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Only add if you already deployed your token',
        example: null
    })
    contractAddress: string


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