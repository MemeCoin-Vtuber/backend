import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmpty, IsOptional, IsString } from "class-validator"


export class UserUpdateDto {

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: "CryptoDegen-Hiro"
    })
    username: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: "Hey i am a crypto degen AI creator"
    })
    bio: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: "https://google.com/profilepic.png"
    })
    profile_pic: string

}