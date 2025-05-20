import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/update.dto';
import { CurrentUser } from 'src/decorators';
import { GetUser } from './privy-decorator';
import { PrivyAuthGuard } from './privy-auth-guard';
import { User } from '@privy-io/server-auth';


@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post("login")
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    @UseGuards(PrivyAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async login(@GetUser user: User) {
        return await this.authService.login(user)
    }

    @Post("update")
    @UseGuards(PrivyAuthGuard)
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