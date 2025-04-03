import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsArray } from 'class-validator';



export class LoginDto {


    @IsString()
    @ApiPropertyOptional({
        description: 'Wallet address of user',
        example: "0x81C157Bc3995Ff7BFC2Aa623F2e9923DBEc44544"
    })
    wallet_address: string

    @IsString()
    @ApiPropertyOptional({
        description: 'message string for which signature is generated',
        example: "Joining P3AI!"
    })
    message: string;

    @IsString()
    @ApiPropertyOptional({
        description: 'message signature',
        example: "0x5d4ec066d6c6088da7b547de76277134cdbde9e49f48ade1eca05ce240d14f620c0af9c89ac5fe9f309df2661a00fbaf5b2d80db172242bf36b0eebddc6108921c"
    })
    signature: string;

}