import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('agent')
export class AgentController {

    constructor(private prismaService: PrismaService) {}


    @Post("create_token")
    @UseGuards(JwtAuthGuard)
    async createToken() {
        
    }

}
