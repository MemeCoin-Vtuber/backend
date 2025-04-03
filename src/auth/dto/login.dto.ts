import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsArray } from 'class-validator';



export class LoginDto {


    @IsString()
    @ApiPropertyOptional({
        description: 'Wallet address of user',
        example: "0x8968697820b90e39c202cd92f343c06a69eb88879d4c98cec25ae9757f9e1db2"
    })
    wallet_address: string

    @IsString()
    @ApiPropertyOptional({
        description: 'Wallet Public key of user',
        example: "0x49e31c31e690a0e32f554fc3b681c1b649dccd51e77684b59f44d330aed7d7b4"
    })
    public_key: string

    @IsString()
    @ApiPropertyOptional({
        description: 'message string for which signature is generated',
        example: "APTOS\nmessage: I'm Shilling on Shilltube.fun\nnonce: 1d3940ae-3cd5-4918-b2b6-803bf8dac344"
    })
    message: string;

    @IsString()
    @ApiPropertyOptional({
        description: 'message signature',
        example: "0x19fb3c53f6fc3a0b1dc7731b819592d4fa36732bc6a633a29d2f172f312a3e8189197954f626a99132e509fb22cbd46cad946c1d48c6da53d1a28c934ba9aa00"
    })
    signature: string;

}