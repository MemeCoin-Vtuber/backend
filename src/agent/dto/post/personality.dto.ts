import { ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from "class-validator";


export class AgentPersonalityDto {

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Token Id",
        example: 1
    })
    aiTokenId: number;

    @IsString()
    @ApiPropertyOptional({
        description: 'Agent voice type: Male/Female/Robot/Child/<Custom>',
        example: "Male"
    })
    voiceType: string;

    @IsArray()
    @IsString({ each: true }) // Ensures each element in the array is a string
    @ArrayNotEmpty()
    @ApiPropertyOptional({
        example: ["Friendly", "Sarcastic", "Energetic"],
        type: [String]
    })
    personalityType: string[];

}