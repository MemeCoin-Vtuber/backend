import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/update.dto';
import { CurrentUser } from 'src/decorators';


@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post("login")
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.wallet_address, loginDto.signature, loginDto.message)
    }

    @Post("update")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async update(@Body() userUpdateDto: UserUpdateDto, @CurrentUser() user) {
        return this.authService.updateUser(
            user.userId as number, 
            userUpdateDto.username, 
            userUpdateDto.bio, 
            userUpdateDto.profile_pic
        )
    }

}
