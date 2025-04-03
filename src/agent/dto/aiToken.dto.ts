import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";


export class AiTokenDto {

    @IsString()
    @ApiPropertyOptional({
        description: 'Token Name',
        example: "Hiroi"
    })
    tokentokenName: string;

    @IsString()
    @ApiPropertyOptional({
        description: 'Token Symbol',
        example: "HRI"
    })
    symbol: string;

    @IsString()
    @ApiPropertyOptional({
        description: 'Token Description',
        example: "Hiroi is a crypto degen and a short tempered female."
    })
    tokenDescription: string;

    @IsString()
    @ApiPropertyOptional({
        description: 'Token Image URL',
        example: "https://tokenurl.png"
    })
    tokenImageUrl: string;

    @IsInt()
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

}