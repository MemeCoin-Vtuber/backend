import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAgentsDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Filter by token name', example: 'Hiroi' })
    tokenName?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Filter by token description', example: 'A crypto degen' })
    tokenDescription?: string;

    @IsOptional()
    @Type(() => Number) // Ensures the value is parsed as a number
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ description: 'Page number for pagination', example: 1 })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiPropertyOptional({ description: 'Number of items per page', example: 10 })
    pageSize?: number = 10;
}
